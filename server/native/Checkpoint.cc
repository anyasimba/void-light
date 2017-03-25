struct Checkpoint: GameLevelZoneObject {
};

void new__Checkpoint(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Checkpoint *self = new Checkpoint;

  self->js.Reset(isolate, args[0]->ToObject());
  self->vtable = VTABLE::CHECKPOINT;

  args.GetReturnValue().Set(node_buffer_new(isolate, self));
}

void Checkpoint__update(Checkpoint *self, GameLevelZone *gameLevelZone, float dt) {

}