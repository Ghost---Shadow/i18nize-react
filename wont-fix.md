# Wont fix

While crawling on random projects on Github. I have found several false positives/false negatives arising from code which I consider to be anti-patterns. I do not plan to support these features.


## Alert boxes (false negative)

### Before
```js
const MyComponent = () => (
  <button onClick={alert('Some string')}>
)
```

### After
```js
const MyComponent = () => (
  <button onClick={alert('Some string')}>
)
```

## Requiring inside JSX component (false positive)

### Before
```js
const MyComponent = (src) => (
  <img src={require(`../${src}`)}>
)
```

### After
```js
const MyComponent = (src) => (
  <img src={require(`${i18n.t(k._)}${src}`)}>
)
```

## Redundant parenthesis (false positive)

### Before
```js
const MyComponent = () => (
  <div>({someLiteral})</div>
)
```

### After
```js
const MyComponent = () => (
  <div>{i18n.t(k._)}{someLiteral}{i18n.t(k._1)}</div>
)
```
