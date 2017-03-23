void GameLevelZone__updateObjectWithBodyCells(GameLevelZone *, GameLevelZoneObject *);
void GameLevelZone__objectWithBodyOthers(GameLevelZone *self, GameLevelZoneObject *object);
void GameLevelZone__updateObjectWithBodyCollisions(GameLevelZone *self, GameLevelZoneObject *object);
void GameLevelZone__resolveCollision(GameLevelZone *self, GameLevelZoneObject *object, GameLevelZoneObject *other);
void GameLevelZone__resolveCircle2CircleCollision(GameLevelZone *self, GameLevelZoneObject *object, GameLevelZoneObject *other);
void GameLevelZone__resolveCircle2StaticRectCollision(GameLevelZone *, GameLevelZoneObject *, float x, float y, float w, float h);

void GameLevelZone__update(const FunctionCallbackInfo<Value>& args) {
  isolate = args.GetIsolate();
  HandleScope scope(isolate);

  GameLevelZone *self = (GameLevelZone *)node::Buffer::Data(args[0]->ToObject());
  float dt = (float) args[1]->NumberValue();

  for (int i = 0; i < (int)self->objects.size(); ++i) {
    GameLevelZoneObject *object = self->objects[i];

    object->beforePos = object->pos;
    object->beforeSpeed = object->speed;
  }

  for (int i = 0; i < (int)self->objects.size(); ++i) {
    GameLevelZoneObject *object = self->objects[i];

    updates[object->vtable](object, self, dt);
  }

  for (int i = 0; i < (int)self->objects.size(); ++i) {
    GameLevelZoneObject *object = self->objects[i];

    object->hasPosChange = false;
    if (object->speed.length() > 0) {
      object->hasPosChange = true;
    }

    object->beforePos2 = object->pos;
    object->beforeSpeed2 = object->speed;
    object->isBodyChecked = false;

    GameLevelZone__updateObjectWithBodyCells(self, object);
    GameLevelZone__objectWithBodyOthers(self, object);
  }

  for (int i = 0; i < (int)self->objects.size(); ++i) {
    GameLevelZoneObject *object = self->objects[i];
    if (!object->hasPosChange) {
      continue;
    }
    object->isBodyChecked = true;
    GameLevelZone__updateObjectWithBodyCollisions(self, object);
  }

  for (int i = 0; i < (int)self->objects.size(); ++i) {
    GameLevelZoneObject *object = self->objects[i];
    if (!object->hasPosChange) {
      continue;
    }

    int cx = (int) floor(object->pos.x / WALL_SIZE);
    int cy = (int) floor(object->pos.y / WALL_SIZE);
    for (int x = -1; x <= 1; ++x) {
      for (int y = -1; y <= 1; ++y) {
        const int X = x + cx;
        const int Y = y + cy;
        if (X >= 0 && X < (int)self->grid.size()) {
          if (Y >= 0 && Y < (int)self->grid[X].size()) {
            if (self->grid[X][Y] == 1) {
              float rx = (X + 0.5f) * WALL_SIZE;
              float ry = (Y + 0.5f) * WALL_SIZE;
              GameLevelZone__resolveCircle2StaticRectCollision(
                self, object, rx, ry, (float) WALL_SIZE, (float) WALL_SIZE);
            }
          }
        }
      }
    }
  }

  for (int i = 0; i < (int)self->objects.size(); ++i) {
    GameLevelZoneObject *object = self->objects[i];
    if (!object->hasPosChange) {
      continue;
    }

    bool hasChange =
      object->beforePos2.x != object->pos.x ||
      object->beforePos2.y != object->pos.y ||
      object->beforeSpeed2.x != object->speed.x ||
      object->beforeSpeed2.y != object->speed.y;
    if (hasChange) {
      Local<Object> js = Local<Object>::New(isolate, object->js);
      Local<Function>::Cast(js->GET("emitPos"))->Call(js, 0, nullptr);
    }
  }
}

void GameLevelZone__updateObjectWithBodyCells(GameLevelZone *self, GameLevelZoneObject *object) {
  if (object->hasCells && !object->hasPosChange) {
    return;
  }
  object->hasCells = true;

  for (int i = 0; i < (int)object->cells.size(); ++i) {
    GameLevelZoneObjectCell& cell = object->cells[i];
    vector<GameLevelZoneObject *>& list = *cell.list;
    for(int j = 0; j < (int)list.size(); ++j) {
      GameLevelZoneObject *other = list[j];
      if (other == object) {
        list.erase(list.begin() + j);
        break;
      }
    }
  }
  object->cells.clear();

  int CELL_SIZE = GameLevelZone::CELL_SIZE();
  int xb = (int)floor(
    (object->pos.x - object->AREA_W * 0.5f) / CELL_SIZE);
  int xe = (int)ceil(
    (object->pos.x + object->AREA_W * 0.5f) / CELL_SIZE);
  int yb = (int)floor(
    (object->pos.y - object->AREA_H * 0.5f) / CELL_SIZE);
  int ye = (int)ceil(
    (object->pos.y + object->AREA_H * 0.5f) / CELL_SIZE);

  for (int x = xb; x <= xe; ++x) {
    for (int y = yb; y <= ye; ++y) {
      if (x >= 0 && x < (int)self->cells.size()) {
        if (y >= 0 && y < (int)self->cells[x].size()) {
          self->cells[x][y].push_back(object);
          GameLevelZoneObjectCell cell;
          cell.list = &self->cells[x][y];
          object->cells.push_back(cell);
        }
      }
    }
  }
}
void GameLevelZone__objectWithBodyOthers(GameLevelZone *self, GameLevelZoneObject *object) {
  object->others.clear();
  for (int i = 0; i < (int)object->cells.size(); ++i) {
    GameLevelZoneObjectCell& cell = object->cells[i];
    vector<GameLevelZoneObject *>& list = *cell.list;
    for (int i = 0; i < (int)list.size(); ++i) {
      GameLevelZoneObject *other = list[i];
      if (object != other) {
        bool exists = false;

        for (int i = 0; i < (int)object->others.size(); ++i) {
          GameLevelZoneObject *existsOther = object->others[i];
          if (existsOther == other) {
            exists = true;
          }
        }

        if (!exists) {
          object->others.push_back(other);
        }
      }
    }
  }
}
void GameLevelZone__updateObjectWithBodyCollisions(GameLevelZone *self, GameLevelZoneObject *object) {
  for (int i = 0; i < (int)object->others.size(); ++i) {
    GameLevelZoneObject *other = object->others[i];
    if (other->isBodyChecked) {
      continue;
    }
    GameLevelZone__resolveCollision(self, object, other);
  }
}
void GameLevelZone__resolveCollision(GameLevelZone *self, GameLevelZoneObject *object, GameLevelZoneObject *other) {
  if (object->BODY_TYPE == CIRCLE && other->BODY_TYPE == CIRCLE) {
    GameLevelZone__resolveCircle2CircleCollision(self, object, other);
  }
  if (object->BODY_TYPE == CIRCLE && other->BODY_TYPE == STATIC_RECT) {
    GameLevelZone__resolveCircle2StaticRectCollision(self, object,
      other->pos.x, other->pos.y, other->BODY_P1, other->BODY_P2);
  }
  if (object->BODY_TYPE == STATIC_RECT && other->BODY_TYPE == CIRCLE) {
    GameLevelZone__resolveCircle2StaticRectCollision(self, other,
      object->pos.x, object->pos.y, object->BODY_P1, object->BODY_P2);
  }
}
void GameLevelZone__resolveCircle2CircleCollision(GameLevelZone *self, GameLevelZoneObject *object, GameLevelZoneObject *other) {
  float bodyD = (object->BODY_P1 + other->BODY_P1) * 0.5f;
  float dx = object->pos.x - other->pos.x;
  float dy = object->pos.y - other->pos.y;
  float d = sqrt(dx * dx + dy * dy);
  if (d < bodyD) {
    other->hasPosChange = true;
    float x = dx / d;
    float y = dy / d;
    float rd = bodyD - d;
    vec2 v = vec2(rd * x, rd * y);
    object->pos += v;
    other->pos -= v;

    v = v.unit();

    float force = object->speed.length() + other->speed.length();
    float imp = 0.5f;
    object->speed += v * (force * imp);
    other->speed -= v * (force * imp);
  }
}
void GameLevelZone__resolveCircle2StaticRectCollision(
  GameLevelZone * self, GameLevelZoneObject *object, float x, float y, float w, float h) {

  float bodyDX = (object->BODY_P1 + w) * 0.5f;
  float bodyDY = (object->BODY_P1 + h) * 0.5f;
  float dx = object->pos.x - x;
  float dy = object->pos.y - y;

  bool isHasCollision = false;
  if (fabs(dy) <= h * 0.5f) {
    if (dx > 0.f && dx < bodyDX) {
      isHasCollision = true;
    } else if (dx < 0 && -dx < bodyDX) {
      isHasCollision = true;
    }
  } else if (fabs(dx) <= w * 0.5f) {
    if (dy > 0.f && dy < bodyDY) {
      isHasCollision = true;
    } else if (dy < 0 && -dy < bodyDY) {
      isHasCollision = true;
    }
  }

  float x1 = (x - w * 0.5f);
  float y1 = (y - h * 0.5f);
  float x2 = (x + w * 0.5f);
  float y2 = (y + h * 0.5f);

  float dx1 = (object->pos.x - x1) * (object->pos.x - x1);
  float dy1 = (object->pos.y - y1) * (object->pos.y - y1);
  float dx2 = (object->pos.x - x2) * (object->pos.x - x2);
  float dy2 = (object->pos.y - y2) * (object->pos.y - y2);

  float d1 = sqrt(dx1 + dy1);
  if (d1 < object->BODY_P1 * 0.5f) {
    isHasCollision = true;
  }
  float d2 = sqrt(dx1 + dy2);
  if (d2 < object->BODY_P1 * 0.5f) {
    isHasCollision = true;
  }
  float d3 = sqrt(dx2 + dy1);
  if (d3 < object->BODY_P1 * 0.5f) {
    isHasCollision = true;
  }
  float d4 = sqrt(dx2 + dy2);
  if (d4 < object->BODY_P1 * 0.5f) {
    isHasCollision = true;
  }

  if (isHasCollision) {
    float dx = object->beforePos.x - x;
    float dy = object->beforePos.y - y;

    float imp = 0.5f;
    if (fabs(dy) <= h * 0.5f) {
      if (dx > 0) {
        object->pos.x = x + bodyDX;
        object->speed.x = fabs(object->speed.x * imp);
      } else {
        object->pos.x = x - bodyDX;
        object->speed.x = -fabs(object->speed.x * imp);
      }
    } else if (fabs(dx) <= w * 0.5f) {
      if (dy > 0) {
        object->pos.y = y + bodyDY;
        object->speed.y = fabs(object->speed.y * imp);
      } else {
        object->pos.y = y - bodyDY;
        object->speed.y = -fabs(object->speed.y * imp);
      }
    } else {
      if (dx < 0 && dy < 0) {
        float dx = (object->pos.x - x1) / d1;
        float dy = (object->pos.y - y1) / d1;
        object->pos.x = x1 + dx * object->BODY_P1 * 0.5f;
        object->pos.y = y1 + dy * object->BODY_P1 * 0.5f;
        float force = object->speed.length();
        object->speed += vec2(dx, dy) * force * imp;
      }
      if (dx < 0 && dy >= 0) {
        float dx = (object->pos.x - x1) / d2;
        float dy = (object->pos.y - y2) / d2;
        object->pos.x = x1 + dx * object->BODY_P1 * 0.5f;
        object->pos.y = y2 + dy * object->BODY_P1 * 0.5f;
        float force = object->speed.length();
        object->speed += vec2(dx, dy) * force * imp;
      }
      if (dx >= 0 && dy < 0) {
        float dx = (object->pos.x - x2) / d3;
        float dy = (object->pos.y - y1) / d3;
        object->pos.x = x2 + dx * object->BODY_P1 * 0.5f;
        object->pos.y = y1 + dy * object->BODY_P1 * 0.5f;
        float force = object->speed.length();
        object->speed += vec2(dx, dy) * force * imp;
      }
      if (dx >= 0 && dy >= 0) {
        float dx = (object->pos.x - x2) / d4;
        float dy = (object->pos.y - y2) / d4;
        object->pos.x = x2 + dx * object->BODY_P1 * 0.5f;
        object->pos.y = y2 + dy * object->BODY_P1 * 0.5f;
        float force = object->speed.length();
        object->speed += vec2(dx, dy) * force * imp;
      }
    }
  }
}