struct Bullet: GameLevelZoneObject {
};

void new__Bullet(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Bullet *self = new Bullet;

  self->js.Reset(isolate, args[0]->ToObject());
  self->vtable = VTABLE::BULLET;

  args.GetReturnValue().Set(node_buffer_new(isolate, self));
}

void Bullet__update(Bullet *self, GameLevelZone *gameLevelZone, float dt) {

}