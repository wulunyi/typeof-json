# typeof-json

Convert json string to typescript interface

## use

```typescript
import { render } from 'typeof-json';

console.log(
  render(
    `
    {
      name: 'lili', // name
      /** age */
      age: 18,
      love: ['ball'],
      test: {
        hello: 'world'
      }
    }`,
    'RootType',
  ),
);
```

result

```typescript
interface Test {
  hello: string;
}

interface RootType {
  /**
   * name
   */
  name: string;
  /**
   * age
   */
  age: number;
  love: string[];
  test: Test;
}
```

## TodoList

- [ ] merge same name interface
- [ ] merge same structure to same interface
- [ ] Custom naming rules
- [ ] Configure whether to generate comments
