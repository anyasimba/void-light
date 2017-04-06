struct Bullet: GameLevelZoneObject {
  float FRICTION;
};

void new__Bullet(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Bullet *self = new Bullet;

  self->js.Reset(isolate, args[0]->ToObject());
  self->vtable = VTABLE::BULLET;
  
  Local<Object> js = Local<Object>::New(isolate, self->js);
  self->FRICTION = (float) js->GET("FRICTION")->NumberValue();

  args.GetReturnValue().Set(node_buffer_new(isolate, self));
}

void Bullet__update(Bullet *self, GameLevelZone *gameLevelZone, float dt) {
  if (self->speed.length() > self->FRICTION * dt) {
    self->speed -= self->speed.unit() * self->FRICTION * dt;
  } else {
    self->speed.init();
  }

  if (self->speed.length() < 200) {
    Local<Object> js = Local<Object>::New(isolate, self->js);
    Local<Function>::Cast(js->GET("destructor"))->Call(js, 0, nullptr);
  }

  self->pos += self->speed * dt;
}