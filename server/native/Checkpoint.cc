struct Checkpoint: GameLevelZoneObject {
};

void new__Checkpoint(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Checkpoint *self = new Checkpoint;

  Local<Object> bufferObj(node::Buffer::New(
    isolate,
    (char *)self,
    sizeof(Checkpoint)).ToLocalChecked());

  self->js.Reset(isolate, args[0]->ToObject());
  self->vtable = VTABLE::CHECKPOINT;

  

  args.GetReturnValue().Set(bufferObj);
}

void Checkpoint__update(Checkpoint *self, GameLevelZone *gameLevelZone, float dt) {
  
}