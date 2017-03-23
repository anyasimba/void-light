#include <node.h>
#include <node_buffer.h>
#include <v8.h>
#include <cstdio>
#include <cstring>
#include <vector>
#include <memory>
#include <cmath>
#include <algorithm>

using namespace v8;
using namespace std;

#define HAS(KEY)\
  Has(String::NewFromUtf8(isolate, KEY))
#define GET(KEY)\
  Get(String::NewFromUtf8(isolate, KEY))
#define SET(KEY, VALUE)\
  Set(String::NewFromUtf8(isolate, KEY), VALUE)

#define NUMBER_PROPERTY(CLASS, FN, PROP)\
  void CLASS##__get##FN(const FunctionCallbackInfo<Value>& args) {\
    Isolate* isolate = args.GetIsolate();\
    HandleScope scope(isolate);\
    CLASS *self = (CLASS *)node::Buffer::Data(args[0]->ToObject());\
    args.GetReturnValue().Set(Number::New(isolate, self->PROP));\
  }\
  void CLASS##__set##FN(const FunctionCallbackInfo<Value>& args) {\
    Isolate* isolate = args.GetIsolate();\
    HandleScope scope(isolate);\
    CLASS *self = (CLASS *)node::Buffer::Data(args[0]->ToObject());\
    self->PROP = (float) args[1]->NumberValue();\
  }
#define SET_NUMBER_PROPERTY(CLASS, FN, ...)\
  NODE_SET_METHOD(exports, #CLASS"__get"#FN, CLASS##__get##FN);\
  NODE_SET_METHOD(exports, #CLASS"__set"#FN, CLASS##__set##FN);

const int WALL_SIZE = 96;

#include "!math.cc"
#include "!utils.cc"
#include "!GameLevelZone.cc"
#include "Bullet.cc"
#include "Checkpoint.cc"
#include "Door.cc"
#include "Fighter.cc"
#include "ItemOnMap.cc"
#include "!GameLevelZone__imp.cc"

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "new__GameLevelZone", new__GameLevelZone);
  NODE_SET_METHOD(exports, "GameLevelZone__update", GameLevelZone__update);
  NODE_SET_METHOD(exports, "GameLevelZone__addObject", GameLevelZone__addObject);
  NODE_SET_METHOD(exports, "GameLevelZone__removeObject", GameLevelZone__removeObject);
  SET_NUMBER_PROPERTY(GameLevelZoneObject, PosX, pos.x);
  SET_NUMBER_PROPERTY(GameLevelZoneObject, PosY, pos.y);
  SET_NUMBER_PROPERTY(GameLevelZoneObject, SpeedX, speed.x);
  SET_NUMBER_PROPERTY(GameLevelZoneObject, SpeedY, speed.y);
  SET_NUMBER_PROPERTY(GameLevelZoneObject, GroundFriction, groundFriction);
  NODE_SET_METHOD(exports, "GameLevelZoneObject__getOthers", GameLevelZoneObject__getOthers);

  NODE_SET_METHOD(exports, "new__Bullet", new__Bullet);
  updates[VTABLE::BULLET] = (VFN) Bullet__update;

  NODE_SET_METHOD(exports, "new__Checkpoint", new__Checkpoint);
  updates[VTABLE::CHECKPOINT] = (VFN) Checkpoint__update;

  NODE_SET_METHOD(exports, "new__Door", new__Door);
  updates[VTABLE::DOOR] = (VFN) Door__update;
  SET_NUMBER_PROPERTY(Door, IsOpening, isOpening);
  SET_NUMBER_PROPERTY(Door, IsClosing, isClosing);
  SET_NUMBER_PROPERTY(Door, IsOpened, isOpened);
  SET_NUMBER_PROPERTY(Door, BasePosX, basePos.x);
  SET_NUMBER_PROPERTY(Door, BasePosY, basePos.y);
  SET_NUMBER_PROPERTY(Door, SizeX, size.x);
  SET_NUMBER_PROPERTY(Door, SizeY, size.y);
  SET_NUMBER_PROPERTY(Door, BaseSizeX, baseSize.x);
  SET_NUMBER_PROPERTY(Door, BaseSizeY, baseSize.y);

  NODE_SET_METHOD(exports, "new__ItemOnMap", new__ItemOnMap);
  updates[VTABLE::ITEM_ON_MAP] = (VFN) ItemOnMap__update;

  NODE_SET_METHOD(exports, "new__Fighter", new__Fighter);
  SET_NUMBER_PROPERTY(Fighter, InputMoveX, inputMove.x);
  SET_NUMBER_PROPERTY(Fighter, InputMoveY, inputMove.y);
  SET_NUMBER_PROPERTY(Fighter, LookX, look.x);
  SET_NUMBER_PROPERTY(Fighter, LookY, look.y);
  SET_NUMBER_PROPERTY(Fighter, InBlock, inBlock);
  SET_NUMBER_PROPERTY(Fighter, InRun, inRun);
  SET_NUMBER_PROPERTY(Fighter, InRoll, inRoll);
  SET_NUMBER_PROPERTY(Fighter, AfterRollTime, afterRollTime);
  SET_NUMBER_PROPERTY(Fighter, RollBlockTime, rollBlockTime);
  SET_NUMBER_PROPERTY(Fighter, InJump, inJump);
  SET_NUMBER_PROPERTY(Fighter, AfterJumpTime, afterJumpTime);
  SET_NUMBER_PROPERTY(Fighter, InHit, inHit);
  SET_NUMBER_PROPERTY(Fighter, HitVecX, hitVec.x);
  SET_NUMBER_PROPERTY(Fighter, HitVecY, hitVec.y);
  SET_NUMBER_PROPERTY(Fighter, StunTime, stunTime);
  SET_NUMBER_PROPERTY(Fighter, WaitTime, waitTime);
  SET_NUMBER_PROPERTY(Fighter, HP, HP);
  SET_NUMBER_PROPERTY(Fighter, Hp, hp);
  SET_NUMBER_PROPERTY(Fighter, HpTime, hpTime);
  SET_NUMBER_PROPERTY(Fighter, STAMINA, STAMINA);
  SET_NUMBER_PROPERTY(Fighter, Stamina, stamina);
  SET_NUMBER_PROPERTY(Fighter, StaminaTime, staminaTime);
  SET_NUMBER_PROPERTY(Fighter, MP, MP);
  SET_NUMBER_PROPERTY(Fighter, Mp, mp);
  SET_NUMBER_PROPERTY(Fighter, MpTime, mpTime);
  SET_NUMBER_PROPERTY(Fighter, BALANCE, BALANCE);
  SET_NUMBER_PROPERTY(Fighter, Balance, balance);
  SET_NUMBER_PROPERTY(Fighter, BalanceTime, balanceTime);
  NODE_SET_METHOD(exports, "Fighter__onRoll", Fighter__onRoll);
  NODE_SET_METHOD(exports, "Fighter__onJump", Fighter__onJump);
  NODE_SET_METHOD(exports, "Fighter__step", Fighter__step);
  NODE_SET_METHOD(exports, "Fighter__clearSteps", Fighter__clearSteps);
  NODE_SET_METHOD(exports, "Fighter__addEffect", Fighter__addEffect);
  NODE_SET_METHOD(exports, "Fighter__getEffects", Fighter__getEffects);
  updates[VTABLE::FIGHTER] = (VFN) Fighter__update;
}

NODE_MODULE(binding, init);