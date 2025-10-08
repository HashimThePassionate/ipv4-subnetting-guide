# Contributing to IPv4 Subnetting & VLSM Interactive Guide

First off, thank you for considering contributing to this project! 🎉

The following is a set of guidelines for contributing to this educational resource. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Adding Educational Content](#adding-educational-content)
  - [Improving Code](#improving-code)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project is committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Specify browser and OS information**

### Suggesting Enhancements

Enhancement suggestions are welcome! When suggesting enhancements:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **Include mockups or examples if applicable**

### Adding Educational Content

We welcome contributions that improve the learning experience:

- **New examples and scenarios** - Real-world networking situations
- **Explanatory diagrams** - Visual aids for complex concepts
- **Practice problems** - Interactive exercises for learners
- **Additional calculators** - Tools for subnet calculations
- **Translations** - Making content accessible in other languages

### Improving Code

Code improvements are always welcome:

- **Bug fixes** - Fixing issues in existing code
- **Performance improvements** - Making the application faster
- **Accessibility enhancements** - Making content more accessible
- **Responsive design** - Better mobile experience
- **Code refactoring** - Cleaner, more maintainable code

## Style Guidelines

### HTML Guidelines

- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Maintain consistent indentation (4 spaces)
- Add comments for complex sections
- Ensure all images have alt text

```html
<!-- Good Example -->
<section id="example" class="content-section">
    <h2>Section Title</h2>
    <p>Clear, concise content...</p>
</section>
```

### CSS Guidelines

- Use CSS variables for colors and spacing
- Follow the existing naming conventions
- Add comments for complex styles
- Maintain responsive design principles
- Support dark mode

```css
/* Good Example */
.custom-element {
    background-color: var(--accent-color);
    padding: var(--spacing-md);
    border-radius: 8px;
}
```

### JavaScript Guidelines

- Use ES6+ features
- Add JSDoc comments for functions
- Handle errors gracefully
- Maintain existing code structure
- Write self-documenting code

```javascript
/**
 * Calculate subnet information based on host requirements
 * @param {number} hostsNeeded - Number of hosts required
 * @returns {Object} Subnet calculation results
 */
function calculateSubnet(hostsNeeded) {
    // Implementation
}
```

## Commit Messages

Write clear, concise commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

**Examples:**

```
✅ Good:
- Add subnet calculator validation
- Fix binary conversion for edge cases
- Update README with new examples
- Improve dark mode color contrast

❌ Avoid:
- fixed stuff
- Update
- changes
```

## Pull Request Process

1. **Fork the repository** and create your branch from `main`
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** and test thoroughly
   - Test in multiple browsers
   - Verify responsive design
   - Check accessibility
   - Ensure no console errors

3. **Update documentation** if needed
   - Update README.md if you add features
   - Add comments to complex code
   - Update examples if behavior changes

4. **Commit your changes** with clear messages
   ```bash
   git commit -m "Add subnet calculator validation"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request** with:
   - Clear title describing the change
   - Detailed description of what and why
   - Screenshots for UI changes
   - Reference to related issues

7. **Wait for review** and address any feedback

## Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/repo-name.git
   cd repo-name
   ```

2. Open `index.html` in your browser or use a local server
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. Make your changes and test

## Testing Checklist

Before submitting a pull request, verify:

- [ ] Code works in Chrome, Firefox, Safari, and Edge
- [ ] Responsive design works on mobile devices
- [ ] Dark mode displays correctly
- [ ] No console errors or warnings
- [ ] All calculators function properly
- [ ] Accessibility standards are maintained
- [ ] Code follows existing style guidelines
- [ ] Documentation is updated if needed

## Questions?

Feel free to:
- Open an issue for discussion
- Contact the maintainer
- Join discussions in pull requests

## Recognition

All contributors will be recognized in the project. Thank you for helping make networking education more accessible! 🙏

---

**Happy Contributing! 🚀**
