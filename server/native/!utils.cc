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

template <typename Collection, typename T>
void remove_first(Collection *coll, T value) {
  auto it = std::find(coll->begin(), coll->end(), value);
  if (it != coll->end()) {
    coll->erase(it);
  }
}

template <typename Collection, typename Predicate>
void for_continue_if(Collection *coll, Predicate pred) {
  for (size_t i = 0; i < coll->size(); ++i) {
    bool stop = !pred((*coll)[i], [&] () {
      coll->erase(coll->begin() + i);
      --i;
    });
    if (stop) {
      break;
    }
  }
}
