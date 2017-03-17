#include <node.h>
#include <node_buffer.h>
#include <v8.h>
#include <stdio.h>
#include <vector>
#include <math.h>

using namespace v8;
using namespace std;

#define GET(KEY)\
  Get(String::NewFromUtf8(isolate, KEY))

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

#include "!math.cc"
#include "!GameLevelZone.cc"
#include "!MixGameObject.cc"
#include "Bullet.cc"
#include "Checkpoint.cc"
#include "Door.cc"
#include "Fighter.cc"

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "new__GameLevelZone", new__GameLevelZone);
  NODE_SET_METHOD(exports, "GameLevelZone__update", GameLevelZone__update);
  NODE_SET_METHOD(exports, "GameLevelZone__addObject", GameLevelZone__addObject);

  NODE_SET_METHOD(exports, "new__Fighter", new__Fighter);
  NODE_SET_METHOD(exports, "Fighter__getPosX", Fighter__getPosX);
  NODE_SET_METHOD(exports, "Fighter__setPosX", Fighter__setPosX);
  NODE_SET_METHOD(exports, "Fighter__getPosY", Fighter__getPosY);
  NODE_SET_METHOD(exports, "Fighter__setPosY", Fighter__setPosY);
  NODE_SET_METHOD(exports, "Fighter__getSpeedX", Fighter__getSpeedX);
  NODE_SET_METHOD(exports, "Fighter__setSpeedX", Fighter__setSpeedX);
  NODE_SET_METHOD(exports, "Fighter__getSpeedY", Fighter__getSpeedY);
  NODE_SET_METHOD(exports, "Fighter__setSpeedY", Fighter__setSpeedY);
  NODE_SET_METHOD(exports, "Fighter__getInputMoveX", Fighter__getInputMoveX);
  NODE_SET_METHOD(exports, "Fighter__setInputMoveX", Fighter__setInputMoveX);
  NODE_SET_METHOD(exports, "Fighter__getInputMoveY", Fighter__getInputMoveY);
  NODE_SET_METHOD(exports, "Fighter__setInputMoveY", Fighter__setInputMoveY);
  updates[VTABLE::FIGHTER] = (VFN) Fighter__update;
}

NODE_MODULE(binding, init);