struct ItemOnMap: GameLevelZoneObject {
};

void new__ItemOnMap(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  ItemOnMap *self = new ItemOnMap;

  self->js.Reset(isolate, args[0]->ToObject());
  self->vtable = VTABLE::ITEM_ON_MAP;

  args.GetReturnValue().Set(node_buffer_new(isolate, self));
}

void ItemOnMap__update(ItemOnMap *self, GameLevelZone *gameLevelZone, float dt) {

}