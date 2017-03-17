enum VTABLE {
  BULLET,
  CHECKPOINT,
  DOOR,
  FIGHTER,

  N,
};

struct GameLevelZoneObject {
  vec2 pos;

  VTABLE vtable;

  vector<GameLevelZoneObject *> children;
};

struct GameLevelZone {
  Local<Object> js;
  vector<vector<int>> grid;

  vector<vector<vector<GameLevelZoneObject *>>> cells;
  vector<GameLevelZoneObject *> objects;
};

typedef void (*VFN)(void *, GameLevelZone *, float);
VFN updates[VTABLE::N];

void new__GameLevelZone(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  GameLevelZone *self = new GameLevelZone;

  Local<Object> bufferObj(node::Buffer::New(
    isolate,
    (char *)self,
    sizeof(GameLevelZone)).ToLocalChecked());

  self->js = args[0]->ToObject();

  Local<Array> grid = Local<Array>::Cast(args[1]);
  self->grid.resize(grid->Length());
  for (int x = 0; x < (int) grid->Length(); ++x) {
    Local<Array> col = Local<Array>::Cast(grid->Get(x));
    self->grid[x].resize(col->Length());
    for (int y = 0; y < (int) col->Length(); ++y) {
      int v = (int) col->Get(y)->NumberValue();
      self->grid[x][y] = v;
    }
  }
  
  args.GetReturnValue().Set(bufferObj);
}

void GameLevelZone__update(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  GameLevelZone *self = (GameLevelZone *)node::Buffer::Data(args[0]->ToObject());
  float dt = args[1]->NumberValue();
  
  for (int i = 0; i < self->objects.size(); ++i) {
    GameLevelZoneObject *object = self->objects[i];

    for (int i = 0; i < object->children.size(); ++i) {
      GameLevelZoneObject *child = object->children[i];

      updates[child->vtable](child, self, dt);
    }

    updates[object->vtable](object, self, dt);
  }
}

void GameLevelZone__addObject(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  GameLevelZone *self = (GameLevelZone *)node::Buffer::Data(args[0]->ToObject());
  GameLevelZoneObject *object = (GameLevelZoneObject *)node::Buffer::Data(args[1]->ToObject());

  self->objects.push_back(object);
}