struct Bullet: GameLevelZoneObject {
};

void new__Bullet(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Bullet *self = new Bullet;

  Local<Object> bufferObj(node::Buffer::New(
    isolate,
    (char *)self,
    sizeof(Bullet)).ToLocalChecked());

  self->js.Reset(isolate, args[0]->ToObject());
  self->vtable = VTABLE::BULLET;

  

  args.GetReturnValue().Set(bufferObj);
}

void Bullet__update(Bullet *self, GameLevelZone *gameLevelZone, float dt) {
  
}