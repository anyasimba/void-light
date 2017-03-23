#ifndef M_PI
#define M_PI           3.14159265358979323846f  /* pi */
#endif

struct vec2 {
  float x;
  float y;

  vec2()
    : x(0)
    , y(0)
  {}
  vec2(float x, float y)
    : x(x)
    , y(y)
  {}

  void init() {
    x = 0;
    y = 0;
  }
  void init(float x, float y) {
    this->x = x;
    this->y = y;
  }

  vec2 operator -() const {
    return vec2(-x, -y);
  }
  vec2 operator +(const vec2& v) const {
    return vec2(x + v.x, y + v.y);
  }
  vec2 operator -(const vec2& v) const {
    return vec2(x - v.x, y - v.y);
  }
  vec2 operator *(float f) const {
    return vec2(x * f, y * f);
  }
  vec2 operator /(float f) const {
    return vec2(x / f, y / f);
  }
  void operator += (const vec2& v) {
    (*this) = (*this) + v;
  }
  void operator -= (const vec2& v) {
    (*this) = (*this) - v;
  }
  void operator *= (float f) {
    (*this) = (*this) * f;
  }
  void operator /= (float f) {
    (*this) = (*this) / f;
  }
  bool operator ==(const vec2& v) const {
    return x == v.x && y == v.y;
  }
  float dot(const vec2& v) const {
    return x * v.x + y * v.y;
  }
  float length() const {
    return sqrt(x * x + y * y);
  }
  vec2 unit() const {
    return (*this) / length();
  }
  float min() const {
    return fmin(x, y);
  }
  float max() const {
    return fmax(x, y);
  }
  float toAngle() const {
    if (x == 0 && y == 0) {
      return 0;
    }
    return atan2f(y, x) * 180.f / M_PI;
  }
  float angleTo(const vec2& v) const {
    return acosf(dot(v) / (length() * v.length())) * 180.f / M_PI;
  }
};