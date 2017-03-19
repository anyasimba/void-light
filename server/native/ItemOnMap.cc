struct ItemOnMap: GameLevelZoneObject {
};

void new__ItemOnMap(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  ItemOnMap *self = new ItemOnMap;

  Local<Object> bufferObj(node::Buffer::New(
    isolate,
    (char *)self,
    sizeof(ItemOnMap)).ToLocalChecked());

  self->js.Reset(isolate, args[0]->ToObject());
  self->vtable = VTABLE::ITEM_ON_MAP;

  

  args.GetReturnValue().Set(bufferObj);
}

void ItemOnMap__update(ItemOnMap *self, GameLevelZone *gameLevelZone, float dt) {
  
}