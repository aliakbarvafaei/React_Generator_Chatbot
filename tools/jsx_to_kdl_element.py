def extract_attributes_and_styles(props: dict):
    """Extracts attributes and styles from JSX elements.
    Args:
        props: the props of the element.
    Returns:
        - attributes: the attributes of the element.
        - styles: the styles of the element.

    """
    attributes = {}
    styles = {}

    for prop_name, prop_value in props.items():
        if prop_name == "style":
            # If the prop is "style", map it to the `styles` dictionary
            styles.update(prop_value)  # Assuming prop_value is already a dict
        else:
            attributes[prop_name] = prop_value

    return attributes, styles


def jsx_to_kdl_element(elementType: str, props: dict, children: list):
    """Converts a JSX AST node to KDLElementsJSX format
    Args:
        elementType: the specifc elementType.
        props: the props of the element.
        children: the children
    Returns:
        - KDLElementsJSX format of the JSX element.
    """
    if isinstance(elementType, str):
        return elementType  # If it's a text node, return as is.

    attributes, styles = extract_attributes_and_styles(props)

    return {
        "elementType": elementType,
        "attributes": attributes,
        "styles": styles,
        "children": [jsx_to_kdl_element(child) for child in children],
    }
