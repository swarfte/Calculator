interface Title {
  title: string;
  icon: string;
}

const options = ref([
  { title: "simple", icon: "mdi-home" },
  { title: "advance", icon: "mdi-calculator" },
  { title: "matrix", icon: "mdi-matrix" },
] as Title[]);

export const useOption = () => {
  return options;
};

const currentTitle = ref("simple");
export const useCurrentTitle = () => {
  return currentTitle;
};

export const setCurrentTitle = (title: string) => {
  currentTitle.value = title;
};
