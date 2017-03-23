template <typename T>
v8::Local<v8::Object> node_buffer_new(v8::Isolate *isolate, T *object) {
  auto buffer = node::Buffer::New(
    isolate,
    (char *)object,
    sizeof(T),
    [](char *obj, void *) { delete reinterpret_cast<T *>(obj); },
    nullptr
  );
  return buffer.ToLocalChecked();
}
