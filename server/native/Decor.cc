struct Decor: GameLevelZoneObject {
};

void new__Decor(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Decor *self = new Decor;

  self->js.Reset(isolate, args[0]->ToObject());
  self->vtable = VTABLE::DECOR;

  args.GetReturnValue().Set(node_buffer_new(isolate, self));
}

void Decor__update(Decor *self, GameLevelZone *gameLevelZone, float dt) {
  float FRICTION = 1000;
  if (self->speed.length() > FRICTION * dt) {
    self->speed -= self->speed.unit() * FRICTION * dt;
  } else {
    self->speed.init();
  }

  self->pos += self->speed * dt;
}