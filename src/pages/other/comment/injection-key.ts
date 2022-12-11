import type { InjectionKey, Ref } from 'vue'

export interface TestType {
  provideInp: Ref<string>
  provideChange: () => void
}

export const TestInjectionKey: string | InjectionKey<TestType> = 'TestInjectionKey'
