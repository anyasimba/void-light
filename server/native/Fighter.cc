struct FighterTimeout {
  Persistent<Function> *fn;
  float time;
};

struct Fighter: GameLevelZoneObject {
  float ACC;
  float RUN_ACC;
  float FRICTION;
  float AIR_FRICTION;
  float MAX_SPEED;

  vec2 look;
  float LOOK_ROTATE_F;
  float LOOK_ROTATE_IN_HIT_F;
  
  float moveTimeF;

  bool inBlock;
  bool inRun;

  bool inRoll;
  float inRollTime;
  float inRollAfterTime;
  float afterRollTime;
  float rollBlockTime;
  bool inJump;
  float inJumpTime;
  float inJumpAfterTime;
  float afterJumpTime;

  float stunTime;
  float waitTime;
  bool inHit;

  float HP;
  float hp;
  float hpTime;
  float STAMINA;
  float stamina;
  float staminaTime;
  float MP;
  float mp;
  float mpTime;
  float BALANCE;
  float balance;
  float balanceTime;

  vec2 inputMove;

  vector<FighterTimeout> timeouts;
};

void new__Fighter(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Fighter *self = new Fighter;

  Local<Object> bufferObj(node::Buffer::New(
    isolate,
    (char *)self,
    sizeof(Fighter)).ToLocalChecked());

  self->js.Reset(isolate, args[0]->ToObject());
  self->vtable = VTABLE::FIGHTER;

  self->inBlock = false;
  self->inRun = false;
  self->inRoll = false;
  self->afterRollTime = -1.f;
  self->rollBlockTime = -1.f;
  self->inJump = false;
  self->afterJumpTime = -1.f;
  self->inHit = false;

  self->stunTime = -1.f;
  self->waitTime = -1.f;

  self->hpTime = -1.f;
  self->staminaTime = -1.f;
  self->mpTime = -1.f;
  self->balanceTime = -1.f;

  Local<Object> opts = args[1]->ToObject();
  self->ACC = (float) opts->GET("ACC")->NumberValue();
  self->RUN_ACC = (float) opts->GET("RUN_ACC")->NumberValue();
  self->FRICTION = (float) opts->GET("FRICTION")->NumberValue();
  self->AIR_FRICTION = (float) opts->GET("AIR_FRICTION")->NumberValue();
  self->MAX_SPEED = (float) opts->GET("MAX_SPEED")->NumberValue();

  self->LOOK_ROTATE_F = (float) opts->GET("LOOK_ROTATE_F")->NumberValue();
  self->LOOK_ROTATE_IN_HIT_F = (float) opts->GET("LOOK_ROTATE_IN_HIT_F")->NumberValue();

  self->moveTimeF = (float) opts->GET("moveTimeF")->NumberValue();

  self->HP = (float) opts->GET("HP")->NumberValue();
  self->hp = (float) opts->GET("hp")->NumberValue();
  self->STAMINA = (float) opts->GET("STAMINA")->NumberValue();
  self->stamina = (float) opts->GET("stamina")->NumberValue();
  self->MP = (float) opts->GET("MP")->NumberValue();
  self->mp = (float) opts->GET("mp")->NumberValue();
  self->BALANCE = (float) opts->GET("BALANCE")->NumberValue();
  self->balance = (float) opts->GET("balance")->NumberValue();
  
  args.GetReturnValue().Set(bufferObj);
}

NUMBER_PROPERTY(Fighter, PosX, pos.x);
NUMBER_PROPERTY(Fighter, PosY, pos.y);
NUMBER_PROPERTY(Fighter, SpeedX, speed.x);
NUMBER_PROPERTY(Fighter, SpeedY, speed.y);
NUMBER_PROPERTY(Fighter, InputMoveX, inputMove.x);
NUMBER_PROPERTY(Fighter, InputMoveY, inputMove.y);
NUMBER_PROPERTY(Fighter, InBlock, inBlock);
NUMBER_PROPERTY(Fighter, InRun, inRun);
NUMBER_PROPERTY(Fighter, InRoll, inRoll);
NUMBER_PROPERTY(Fighter, AfterRollTime, afterRollTime);
NUMBER_PROPERTY(Fighter, RollBlockTime, rollBlockTime);
NUMBER_PROPERTY(Fighter, InJump, inJump);
NUMBER_PROPERTY(Fighter, AfterJumpTime, afterJumpTime);
NUMBER_PROPERTY(Fighter, InHit, inHit);
NUMBER_PROPERTY(Fighter, StunTime, stunTime);
NUMBER_PROPERTY(Fighter, WaitTime, waitTime);
NUMBER_PROPERTY(Fighter, HP, HP);
NUMBER_PROPERTY(Fighter, Hp, hp);
NUMBER_PROPERTY(Fighter, HpTime, hpTime);
NUMBER_PROPERTY(Fighter, STAMINA, STAMINA);
NUMBER_PROPERTY(Fighter, Stamina, stamina);
NUMBER_PROPERTY(Fighter, StaminaTime, staminaTime);
NUMBER_PROPERTY(Fighter, MP, MP);
NUMBER_PROPERTY(Fighter, Mp, mp);
NUMBER_PROPERTY(Fighter, MpTime, mpTime);
NUMBER_PROPERTY(Fighter, BALANCE, BALANCE);
NUMBER_PROPERTY(Fighter, Balance, balance);
NUMBER_PROPERTY(Fighter, BalanceTime, balanceTime);

void Fighter__update(Fighter *self, GameLevelZone *gameLevelZone, float dt) {
  // SERVER
  if (self->balanceTime > 0.f) {
    self->balanceTime -= dt;
  } else {
    self->balance = fmin(self->BALANCE, self->balance + dt * 40);
  }

  if (self->rollBlockTime > 0.f) {
    self->rollBlockTime -= dt;
  }

  // SHARED
  float AIR_FRICTION_F = 1.f;
  if (self->inJump || self->inRoll) {
    AIR_FRICTION_F *= 0.2f / self->moveTimeF;
  }
  const float AIR_FRICTION = pow(self->AIR_FRICTION, AIR_FRICTION_F);
  const float AIR_F = pow(AIR_FRICTION, dt);
  const float A_AIR_F = (1.f - AIR_F) / (1.f - AIR_FRICTION);

  self->speed *= AIR_F;
  
  bool isMove = self->inputMove.length() > 0 &&
    !self->inHit &&
    !self->inJump &&
    !self->inRoll &&
    self->stunTime <= 0.f &&
    self->waitTime <= 0.f;

  if (isMove) {
    float a = 0;
    if (self->inRun) {
      self->stamina -= dt * 5.f;
      self->staminaTime = fmax(self->staminaTime, 0.05f);
      if (self->stamina <= 0.f) {
        self->stamina = 0.f;
        self->staminaTime = fmax(self->staminaTime, 0.5f);
        a = self->RUN_ACC * 0.5f;
      } else {
        a = self->RUN_ACC;
      }
    } else if (self->inBlock) {
      a = self->ACC * 0.8f;
    } else {
      a = self->ACC;
    }

    self->speed += self->inputMove.unit() * (a + self->FRICTION) * A_AIR_F;
  }

  // Friction.
  float FRICTION_F = 1;
  if (self->inJump) {
    FRICTION_F = 0.f;
  } else if (self->inRoll) {
    FRICTION_F = 0.5f;
  }
  if (self->speed.length() > self->FRICTION * A_AIR_F * FRICTION_F) {
    self->speed -= self->speed.unit() * self->FRICTION * A_AIR_F * FRICTION_F;
  } else {
    self->speed.init();
  }

  if (self->speed.length() > self->MAX_SPEED) {
    self->speed = self->speed.unit() * self->MAX_SPEED;
  }
  self->pos += self->speed * dt;

  // Look.
  bool isChangeLook =
    (!self->inJump && !self->inRoll && self->stunTime <= 0.f && self->waitTime <= 0.f) ||
    self->inHit;

  if (isChangeLook) {
    vec2 lookInput = self->inputMove;
    float lookF = self->LOOK_ROTATE_F;
    // if (self->absLook && !gameObjects[self->absLook]) {
    //   delete self->absLook;
    // }
    // if (self->absLook) {
    //   lookInput = gameObjects[self->absLook].pos.subtract(self->pos).unit();
    // }
    // if (self->inHit) {
    //   lookInput = self->hitVec;
    //   lookF = Fighter.LOOK_ROTATE_IN_HIT_F;
    // }
    // if (lookInput.length() > 0.05) {
    //   const lookRel = lookInput
    //     .subtract(self->look)
    //     .multiply(1 - Math.pow(1 - lookF, dt));
    //   vec3.add(self->look, lookRel);
    // }
  }

  if (self->hpTime > 0) {
    self->hpTime -= dt;
  } else {
    self->hp = fmin(self->HP, self->hp + dt * 0.25f);
  }
  if (self->staminaTime > 0) {
    self->staminaTime -= dt;
  } else {
    self->stamina = fmin(self->STAMINA,
      self->stamina + dt * 15.f * self->moveTimeF * (1 + self->STAMINA * 0.01f));
  }

  if (self->inRoll) {
    self->inRollTime -= dt;
    if (self->inRollTime <= 0.f) {
      self->inRoll = false;
      self->afterRollTime = self->inRollAfterTime;
    }
  }
  if (self->afterRollTime > 0.f) {
    self->afterRollTime -= dt;
  }
  if (self->inJump) {
    self->inJumpTime -= dt;
    if (self->inJumpTime <= 0.f) {
      self->inJump = false;
      self->afterJumpTime = self->inJumpAfterTime;
    }
  }
  if (self->afterJumpTime > 0.f) {
    self->afterJumpTime -= dt;
  }

  if (self->stunTime > 0.f) {
    self->stunTime -= dt;
  }

  if (self->waitTime > 0) {
    self->waitTime -= dt;
  }

  for (int i = 0; i < self->timeouts.size(); ++i) {
    FighterTimeout& timeout = self->timeouts[i];
    timeout.time -= dt;
    if (timeout.time <= 0.f) {
      Local<Function> fn = Local<Function>::New(isolate, *timeout.fn);
      Local<Object> js = Local<Object>::New(isolate, self->js);
      fn->Call(js, 0, nullptr);
      delete timeout.fn;
      self->timeouts.erase(self->timeouts.begin() + i);
      --i;
    }
  }
}

// for (const k in self->timeouts) {
//   const timeout = self->timeouts[k];
//   if (timeout) {
//     timeout.time -= dt;
//     if (timeout.time <= 0) {
//       delete self->timeouts[k];
//       timeout.fn();
//     }
//   }
// }

// if (self->effects) {
//   let i = 0;
//   while (self->effects[i]) {
//     const eff = self->effects[i];
//     eff.time = eff.time || eff.DURATION;
//     eff.time -= dt;
//     if (eff.time <= 0) {
//       self->effects.splice(i, 1);
//     } else {
//       ++i;

//       if (eff.HP) {
//         self->hp = Math.min(
//           self->HP,
//           self->hp + dt * eff.HP / eff.DURATION);
//       }
//       if (eff.MP) {
//         self->mp = Math.min(
//           self->MP,
//           self->mp + dt * eff.MP / eff.DURATION);
//       }
//       if (eff.STAMINA) {
//         self->stamina = Math.min(
//           self->STAMINA,
//           self->stamina + dt * eff.STAMINA / eff.DURATION);
//       }
//     }
//   }
// }

void Fighter__getOthers(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Fighter *self = (Fighter *)node::Buffer::Data(args[0]->ToObject());

  Local<Array> array = Array::New(isolate, self->others.size());

  for(int i = 0; i < self->others.size(); ++i) {
    GameLevelZoneObject *other = self->others[i];
    Local<Object> js = Local<Object>::New(isolate, other->js);
    array->Set(i, js);
  }

  args.GetReturnValue().Set(array);
}
void Fighter__onRoll(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Fighter *self = (Fighter *)node::Buffer::Data(args[0]->ToObject());

  Local<Object> opts = args[1]->ToObject();

  vec2 input = self->inputMove;
  if (self->inJump || self->inHit || self->speed.length() == 0.f) {
    input = self->look;
  }
  if (self->inJump) {
    self->speed = input.unit() * (float) opts->GET("forceInJump")->NumberValue();
  } else {
    self->speed = input.unit() * (float) opts->GET("force")->NumberValue();
  }
  self->inRoll = true;
  self->inRollTime = (float) opts->GET("duration")->NumberValue();
  self->inRollAfterTime = (float) opts->GET("afterTime")->NumberValue();
  self->look = self->speed.unit();
}
void Fighter__onJump(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Fighter *self = (Fighter *)node::Buffer::Data(args[0]->ToObject());

  Local<Object> opts = args[1]->ToObject();

  if (self->speed.length() == 0) {
    self->speed = self->look.unit() * (float) opts->GET("force")->NumberValue();
  } else {
    self->speed = self->speed.unit() * (float) opts->GET("force")->NumberValue();
  }
  self->inJump = true;
  self->inJumpTime = (float) opts->GET("duration")->NumberValue();
  self->inJumpAfterTime = (float) opts->GET("afterTime")->NumberValue();
  self->look = self->speed.unit();
}
void Fighter__step(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Fighter *self = (Fighter *)node::Buffer::Data(args[0]->ToObject());
  FighterTimeout timeout;
  timeout.fn = new Persistent<Function>(isolate, Local<Function>::Cast(args[1]));
  timeout.time = (float) args[2]->NumberValue();
  self->timeouts.push_back(timeout);
}
void Fighter__clearSteps(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Fighter *self = (Fighter *)node::Buffer::Data(args[0]->ToObject());

  for (int i = 0; i < self->timeouts.size(); ++i) {
    FighterTimeout& timeout = self->timeouts[i];
    delete timeout.fn;
    self->timeouts.erase(self->timeouts.begin() + i);
    --i;
  }
}