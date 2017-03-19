enum VTABLE {
  BULLET,
  CHECKPOINT,
  DOOR,
  FIGHTER,
  ITEM_ON_MAP,

  N,
};

enum BODY_TYPE_ENUM {
  CIRCLE,
  STATIC_RECT,
};

struct GameLevelZoneObject;

struct GameLevelZoneObjectCell {
  vector<GameLevelZoneObject *> *list;
};

struct GameLevelZoneObject {
  Persistent<Object> js;
  bool isNeedDestroy;

  bool isStatic;

  vec2 pos;
  vec2 beforePos;
  vec2 beforePos2;
  vec2 speed;
  vec2 beforeSpeed;
  vec2 beforeSpeed2;
  bool hasPosChange;

  short AREA_W;
  short AREA_H;
  BODY_TYPE_ENUM BODY_TYPE;
  float BODY_P1;
  float BODY_P2;
  bool isBodyChecked;

  vector<GameLevelZoneObjectCell> cells;
  bool hasCells;
  vector<GameLevelZoneObject *> others;

  VTABLE vtable;
};
NUMBER_PROPERTY(GameLevelZoneObject, PosX, pos.x);
NUMBER_PROPERTY(GameLevelZoneObject, PosY, pos.y);
NUMBER_PROPERTY(GameLevelZoneObject, SpeedX, speed.x);
NUMBER_PROPERTY(GameLevelZoneObject, SpeedY, speed.y);

void GameLevelZoneObject__getOthers(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  GameLevelZoneObject *self = (GameLevelZoneObject *)node::Buffer::Data(args[0]->ToObject());

  Local<Array> array = Array::New(isolate, self->others.size());

  for(int i = 0; i < self->others.size(); ++i) {
    GameLevelZoneObject *other = self->others[i];
    Local<Object> js = Local<Object>::New(isolate, other->js);
    array->Set(i, js);
  }

  args.GetReturnValue().Set(array);
}

struct GameLevelZone {
  Local<Object> js;
  vector<vector<int>> grid;

  vector<vector<vector<GameLevelZoneObject *>>> cells;
  vector<GameLevelZoneObject *> objects;

  static int CELL_SIZE() {
    return WALL_SIZE * 8;
  }
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

  const int cell_w = ceil(self->grid.size() * WALL_SIZE / self->CELL_SIZE());
  const int cell_h = ceil(self->grid[0].size() * WALL_SIZE / self->CELL_SIZE());
  self->cells.resize(cell_w);
  for (int x = 0; x < cell_w; ++x) {
    self->cells[x].resize(cell_h);
  }
  
  args.GetReturnValue().Set(bufferObj);
}

Isolate *isolate;

void GameLevelZone__addObject(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  GameLevelZone *self = (GameLevelZone *)node::Buffer::Data(args[0]->ToObject());
  GameLevelZoneObject *object = (GameLevelZoneObject *)node::Buffer::Data(args[1]->ToObject());

  Local<Object> js = Local<Object>::New(isolate, object->js);

  Local<Object> body = js->GET("body")->ToObject();
  Local<String> kind = body->GET("kind")->ToString();
  if (strcmp(*String::Utf8Value(kind), "circle") == 0) {
    object->BODY_TYPE = CIRCLE;
    object->BODY_P1 = (float) body->GET("size")->NumberValue();
  } else if (strcmp(*String::Utf8Value(kind), "staticRect") == 0) {
    object->BODY_TYPE = STATIC_RECT;
    object->BODY_P1 = (float) body->GET("w")->NumberValue();
    object->BODY_P2 = (float) body->GET("h")->NumberValue();
  }

  object->isNeedDestroy = false;
  object->isStatic = js->GET("isStatic")->BooleanValue();
  object->hasCells = false;
  object->AREA_W = 500;
  object->AREA_H = 500;

  self->objects.push_back(object);
}

void GameLevelZone__removeObject(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  GameLevelZone *self = (GameLevelZone *)node::Buffer::Data(args[0]->ToObject());
  GameLevelZoneObject *object = (GameLevelZoneObject *)node::Buffer::Data(args[1]->ToObject());

  for (int i = 0; i < self->objects.size(); ++i) {
    GameLevelZoneObject *other = self->objects[i];
    if (other == object) {
      self->objects.erase(self->objects.begin() + i);
    }
  }

  for (int i = 0; i < object->cells.size(); ++i) {
    GameLevelZoneObjectCell& cell = object->cells[i];
    vector<GameLevelZoneObject *>& list = *cell.list;
    for(int j = 0; j < list.size(); ++j) {
      GameLevelZoneObject *other = list[j];
      if (other == object) {
        list.erase(list.begin() + j);
        break;
      }
    }
  }
  object->cells.clear();
}