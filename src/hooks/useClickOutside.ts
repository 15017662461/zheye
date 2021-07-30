import { Ref, ref, onMounted, onUnmounted } from 'vue'
function useClickOutside(elementRef: Ref<null | HTMLElement>) {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    console.dir(elementRef.value?.contains)
    if(elementRef.value){
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  }
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  return isClickOutside
}

export default useClickOutside;