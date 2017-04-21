enum VTABLE {
  BULLET,
  CHECKPOINT,
  DECOR,
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
  float z;
  float speedZ;
  bool isFall;
  vec2 beforePos;
  vec2 beforePos2;
  float beforeZ;
  float beforeZ2;
  float beforeSpeedZ;
  float beforeSpeedZ2;
  bool beforeIsFall;
  vec2 speed;
  vec2 beforeSpeed;
  vec2 beforeSpeed2;
  bool hasPosChange;

  float beforeGroundFriction;
  float groundFriction;

  float groundAffectTime;
  int groundAffectType;

  short AREA_W;
  short AREA_H;
  BODY_TYPE_ENUM BODY_TYPE;
  float BODY_P1;
  float BODY_P2;
  float BODY_P3;
  bool isBodyChecked;

  vector<GameLevelZoneObjectCell> cells;
  bool hasCells;
  vector<GameLevelZoneObject *> others;

  VTABLE vtable;
};
NUMBER_PROPERTY(GameLevelZoneObject, PosX, pos.x);
NUMBER_PROPERTY(GameLevelZoneObject, PosY, pos.y);
NUMBER_PROPERTY(GameLevelZoneObject, Z, z);
NUMBER_PROPERTY(GameLevelZoneObject, SpeedZ, speedZ);
NUMBER_PROPERTY(GameLevelZoneObject, IsFall, isFall);
NUMBER_PROPERTY(GameLevelZoneObject, SpeedX, speed.x);
NUMBER_PROPERTY(GameLevelZoneObject, SpeedY, speed.y);
NUMBER_PROPERTY(GameLevelZoneObject, GroundFriction, groundFriction);

void GameLevelZoneObject__getOthers(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  GameLevelZoneObject *self = (GameLevelZoneObject *)node::Buffer::Data(args[0]->ToObject());

  Local<Array> array = Array::New(isolate, (int)self->others.size());

  for(int i = 0; i < (int)self->others.size(); ++i) {
    GameLevelZoneObject *other = self->others[i];
    Local<Object> js = Local<Object>::New(isolate, other->js);
    array->Set(i, js);
  }

  args.GetReturnValue().Set(array);
}

struct GroundCell {
  int type;
  float z;
};

struct GameLevelZone {
  Local<Object> js;
  vector<vector<vector<GroundCell>>> grid;

  vector<vector<vector<GameLevelZoneObject *>>> cells;
  vector<GameLevelZoneObject *> objects;

  float dt;

  static int CELL_SIZE() {
    return WALL_SIZE * 4;
  }
};

typedef void (*VFN)(void *, GameLevelZone *, float);
VFN updates[VTABLE::N];

void new__GameLevelZone(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  GameLevelZone *self = new GameLevelZone;

  self->js = args[0]->ToObject();

  Local<Array> grid = Local<Array>::Cast(args[1]);
  self->grid.resize(6);
  for (int i = 0; i < 6; ++i) {
    Local<Array> layer = Local<Array>::Cast(grid->Get(i));
    self->grid[i].resize(layer->Length());
    for (int x = 0; x < (int)layer->Length(); ++x) {
      Local<Array> col = Local<Array>::Cast(layer->Get(x));
      self->grid[i][x].resize(col->Length());
      for (int y = 0; y < (int)col->Length(); ++y) {
        Local<Array> set = Local<Array>::Cast(col->Get(y));
        GroundCell cell;
        cell.type = (int)set->Get(0)->NumberValue();
        cell.z = (float)set->Get(1)->NumberValue();
        self->grid[i][x][y] = cell;
      }
    }
  }

  const int cell_w = (int)ceil(self->grid[0].size() * WALL_SIZE / self->CELL_SIZE());
  const int cell_h = (int)ceil(self->grid[0][0].size() * WALL_SIZE / self->CELL_SIZE());
  self->cells.resize(cell_w);
  for (int x = 0; x < cell_w; ++x) {
    self->cells[x].resize(cell_h);
  }

  args.GetReturnValue().Set(node_buffer_new(isolate, self));
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
    object->AREA_W = object->BODY_P1 + 300;
    object->AREA_H = object->BODY_P1 + 300;
  } else if (strcmp(*String::Utf8Value(kind), "staticRect") == 0) {
    object->BODY_TYPE = STATIC_RECT;
    object->BODY_P1 = (float) body->GET("w")->NumberValue();
    object->BODY_P2 = (float) body->GET("h")->NumberValue();
    object->BODY_P3 = (float) body->GET("z2")->NumberValue();
    object->AREA_W = object->BODY_P1 + 300;
    object->AREA_H = object->BODY_P2 + 300;
  }

  object->isNeedDestroy = false;
  object->isStatic = js->GET("isStatic")->BooleanValue();
  object->hasCells = false;

  object->speedZ = 0;
  object->isFall = false;

  object->groundFriction = 1.f;
  object->groundAffectTime = -1.f;

  self->objects.push_back(object);
}

void GameLevelZone__removeObject(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  HandleScope scope(isolate);

  GameLevelZone *self = (GameLevelZone *)node::Buffer::Data(args[0]->ToObject());
  GameLevelZoneObject *object = (GameLevelZoneObject *)node::Buffer::Data(args[1]->ToObject());

  remove_first(&self->objects, object);

  for (auto &cell: object->cells) {
    remove_first(cell.list, object);
  }
  object->cells.clear();
}