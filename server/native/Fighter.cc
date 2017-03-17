struct Fighter: GameLevelZoneObject {
  Local<Object> js;

  float ACC;
  float RUN_ACC;
  float FRICTION;
  float AIR_FRICTION;
  float MAX_SPEED;
  
  float moveTimeF;

  bool isBlock;
  bool isRun;

  bool inRoll;
  bool inJump;
  bool inHit;

  float stunTime;
  float waitTime;

  float STAMINA;
  float stamina;
  float staminaTime;

  float HP;
  float hp;
  float hpTime;

  vec2 speed;
  vec2 inputMove;
};

void new__Fighter(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Fighter *self = new Fighter;

  Local<Object> bufferObj(node::Buffer::New(
    isolate,
    (char *)self,
    sizeof(Fighter)).ToLocalChecked());

  self->js = args[0]->ToObject();
  self->vtable = VTABLE::FIGHTER;

  self->isBlock = false;
  self->isRun = false;
  self->inRoll = false;
  self->inJump = false;
  self->inHit = false;

  self->stunTime = 0.f;
  self->waitTime = 0.f;

  self->hpTime = 0.f;
  self->staminaTime = 0.f;

  Local<Object> opts = args[1]->ToObject();
  self->ACC = (float) opts->GET("ACC")->NumberValue();
  self->RUN_ACC = (float) opts->GET("RUN_ACC")->NumberValue();
  self->FRICTION = (float) opts->GET("FRICTION")->NumberValue();
  self->AIR_FRICTION = (float) opts->GET("AIR_FRICTION")->NumberValue();
  self->MAX_SPEED = (float) opts->GET("MAX_SPEED")->NumberValue();

  self->moveTimeF = (float) opts->GET("moveTimeF")->NumberValue();

  self->HP = (float) opts->GET("HP")->NumberValue();
  self->hp = (float) opts->GET("hp")->NumberValue();
  self->STAMINA = (float) opts->GET("STAMINA")->NumberValue();
  self->stamina = (float) opts->GET("stamina")->NumberValue();
  
  args.GetReturnValue().Set(bufferObj);
}

NUMBER_PROPERTY(Fighter, PosX, pos.x);
NUMBER_PROPERTY(Fighter, PosY, pos.y);
NUMBER_PROPERTY(Fighter, SpeedX, speed.x);
NUMBER_PROPERTY(Fighter, SpeedY, speed.y);
NUMBER_PROPERTY(Fighter, InputMoveX, inputMove.x);
NUMBER_PROPERTY(Fighter, InputMoveY, inputMove.y);

void Fighter__update(Fighter *self, GameLevelZone *gameLevelZone, float dt) {
  // SERVER
  
  // SHARED
  float FRICTION_F = 1.f;
  if (self->inJump || self->inRoll) {
    FRICTION_F *= 0.1f / self->moveTimeF;
  }
  const float AIR_FRICTION = pow(self->AIR_FRICTION, FRICTION_F);
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
    if (self->isRun) {
      self->stamina -= dt * 5.f;
      self->staminaTime = fmax(self->staminaTime, 0.05f);
      if (self->stamina <= 0.f) {
        self->stamina = 0.f;
        self->staminaTime = fmax(self->staminaTime, 0.5f);
        a = self->RUN_ACC * 0.5f;
      } else {
        a = self->RUN_ACC;
      }
    } else if (self->isBlock) {
      a = self->ACC * 0.8f;
    } else {
      a = self->ACC;
    }

    self->speed += self->inputMove.unit() * (a + self->FRICTION) * A_AIR_F;
  }

  if (!self->inJump) {
    if (self->speed.length() > self->FRICTION * A_AIR_F) {
      self->speed -= self->speed.unit() * self->FRICTION * A_AIR_F;
    } else {
      self->speed.init();
    }
  }

  if (self->speed.length() > self->MAX_SPEED) {
    self->speed = self->speed.unit() * self->MAX_SPEED;
  }
  self->pos += self->speed * dt;

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

  // if (self->inRoll) {
  //   self->inRoll.time += dt;
  //   if (self->inRoll.time >= self->inRoll.duration) {
  //     self->afterRollTime = self->inRoll.afterTime;
  //     delete self->inRoll;
  //   }
  // }
  // if (self->afterRollTime) {
  //   self->afterRollTime -= dt;
  //   if (self->afterRollTime <= 0) {
  //     delete self->afterRollTime;
  //   }
  // }
  // if (self->inJump) {
  //   self->inJump.time += dt;
  //   if (self->inJump.time >= self->inJump.duration) {
  //     self->afterJumpTime = self->inJump.afterTime;
  //     delete self->inJump;
  //   }
  // }
  // if (self->afterJumpTime) {
  //   self->afterJumpTime -= dt;
  //   if (self->afterJumpTime <= 0) {
  //     delete self->afterJumpTime;
  //   }
  // }
}

// if (self->stunTime !== undefined) {
//   if (!self->inStun) {
//     self->inStun = true;
//     self->staminaTime = self->stunTime * 0.5;
//     delete self->needNextHit;

//     const hands = self->hands;
//     for (const k in hands) {
//       const hand = hands[k];
//       if (hand && hand.opts && hand.opts.onStun) {
//         hand.opts.onStun.call(hand);
//       }
//     }
//   }
//   self->stunTime -= dt;
//   if (self->stunTime <= 0) {
//     delete self->stunTime;
//     delete self->inStun;
//     if (!self->inHit) {
//       self->clearSteps();
//       const hands = self->hands;
//       for (const k in hands) {
//         const hand = hands[k];
//         if (hand) {
//           hand.finalStage(0.2, easing.easeInOutCubic);
//         }
//       }
//     }
//   }
// }
// if (self->waitTime) {
//   if (!self->inWait) {
//     self->inWait = true;
//     delete self->needNextHit;

//     self->clearSteps();
//     const hands = self->hands;
//     for (const k in hands) {
//       const hand = hands[k];
//       if (hand) {
//         hand.finalStage(0.2, easing.easeInOutCubic);
//         hand.stage(0.2, easing.easeInOutCubic, {
//           vAngle: 40,
//         });
//       }
//     }
//   }
//   self->waitTime -= dt;
//   if (self->waitTime <= 0) {
//     delete self->waitTime;
//     delete self->inWait;

//     self->clearSteps();
//     const hands = self->hands;
//     for (const k in hands) {
//       const hand = hands[k];
//       if (hand) {
//         hand.finalStage(0.2, easing.easeInOutCubic);
//       }
//     }
//   }
// }

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