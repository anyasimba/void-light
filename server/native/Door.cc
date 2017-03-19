struct Door: GameLevelZoneObject {
  float isOpening;
  float isClosing;
  bool isOpened;

  vec2 basePos;
  vec2 size;
  vec2 baseSize;
};

void new__Door(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  Door *self = new Door;

  Local<Object> bufferObj(node::Buffer::New(
    isolate,
    (char *)self,
    sizeof(Door)).ToLocalChecked());

  self->js.Reset(isolate, args[0]->ToObject());
  self->vtable = VTABLE::DOOR;

  self->isOpening = -1.f;
  self->isClosing = -1.f;
  self->isOpened = false;

  args.GetReturnValue().Set(bufferObj);
}
NUMBER_PROPERTY(Door, IsOpening, isOpening);
NUMBER_PROPERTY(Door, IsClosing, isClosing);
NUMBER_PROPERTY(Door, IsOpened, isOpened);
NUMBER_PROPERTY(Door, BasePosX, basePos.x);
NUMBER_PROPERTY(Door, BasePosY, basePos.y);
NUMBER_PROPERTY(Door, SizeX, size.x);
NUMBER_PROPERTY(Door, SizeY, size.y);
NUMBER_PROPERTY(Door, BaseSizeX, baseSize.x);
NUMBER_PROPERTY(Door, BaseSizeY, baseSize.y);

void Door__update(Door *self, GameLevelZone *gameLevelZone, float dt) {
  if (self->isOpening > 0.f) {
    self->isOpening -= dt;
    if (self->isOpening <= 0.f) {
      self->isOpening = 0.f;
    }

    if (self->baseSize.x > self->baseSize.y) {
      self->size.x = self->baseSize.x * self->isOpening / 4.f;
      self->pos.x = self->basePos.x - (self->baseSize.x - self->size.x) * 0.5f;
    } else {
      self->size.y = self->baseSize.y * self->isOpening / 4.f;
      self->pos.y = self->basePos.y - (self->baseSize.y - self->size.y) * 0.5f;
    }

    if (self->isOpening <= 0) {
      self->isOpened = true;
    }
  }
  if (self->isClosing > 0.f) {
    self->isClosing -= dt;

    if (self->isClosing <= 0.f) {
      self->isClosing = 0.f;
    }
    if (self->baseSize.x > self->baseSize.y) {
      self->size.x = self->baseSize.x * (1.f - self->isClosing / 4.f);
      self->pos.x = self->basePos.x - (self->baseSize.x - self->size.x) * 0.5f;
    } else {
      self->size.y = self->baseSize.y * (1.f - self->isClosing / 4.f);
      self->pos.y = self->basePos.y - (self->baseSize.y - self->size.y) * 0.5f;
    }

    if (self->isClosing <= 0) {
      self->isOpened = false;
    }
  }

  self->BODY_P1 = self->size.x;
  self->BODY_P2 = self->size.y;
}