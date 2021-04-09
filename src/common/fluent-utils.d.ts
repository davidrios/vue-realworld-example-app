declare module "vue/types/vue" {
  export interface Vue {
    $t(key: string, value: any): any;
    $ta(key: string, value: any): any;
  }
}

export {}
