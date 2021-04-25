# Pet

Pet is a generic _card_ like component, that display a _single_ pet, in the `<PetGrid>`.

## Props

The props represents the `Pet` interface

```text
Pet {
  name: string
  photoUrls: Array<string>,
  category: string,
  tags Array<string>,
  status: Enum.Status,
}
```

| name        | type                             | default | isRequired |
| ----------- | -------------------------------- | ------- | ---------- |
| `status`    | `enum: avaliable, pending, sold` | `null`  | `true`     |
| `name`      | `string`                         | `null`  | `true`     |
| `photoUrls` | `Array<String>`                  | `null`  | `true`     |
| `category`  | `string`                         | `null`  | `true`     |
| `ttags`     | `Array<strign>`                  | `null`  | `true`     |

## Example

A simple example of usage:

```javascript
  <Pet
    name="Pablo"
    photoUrls={['oneimage' 'anotherImage']}
    satus="avaliable"
    categroy="some category"
    tags={['some tag', 'some other tag']}
  />
```

Example implementation of this copmonent can be found in the `<PetGrid>`, in: `packages/client/src/components/PetGrid/index.tsx`
