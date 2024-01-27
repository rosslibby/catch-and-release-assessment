export const classnames = (
  names: (string | [string, boolean?])[]
): string => {
  return names.reduce((
    acc: string[],
    classname: string | [string, boolean?]
  ) => {
    if (typeof classname === 'string') {
      return [...acc, classname]
    } else {
      const [name, enabled] = classname
      if (enabled) {
        return [...acc, name]
      }
    }

    return acc
  }, []).join(' ')
}
