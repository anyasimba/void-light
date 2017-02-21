export async function run(fn) {
  try {
    return await fn();
  } catch (e) {}
}