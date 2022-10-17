/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type Tag={
  id: number,
  user_id: number,
  name: string,
  sign: string,
  kind: 'expenses' | 'income'
}

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type FormErrors<T> = {[K in keyof typeof T]: string[]}

type Resources< T= any>={
  resources:T[]
  pager:{
    page:number,
    per_page:number,
    count:number
  }
}

type Item={
  id:number
  user_id:number
  amount:number
  tag_ids: number[];
  tags?:Tag[]
  happen_at:string
  kind:'expenses'|'income'
}

type ResourceError={
  errors:Record<string, string[]>
}