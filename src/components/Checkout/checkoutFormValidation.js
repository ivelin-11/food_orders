const validators = {
  name: (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Please enter your full name.";
    }
    const parts = trimmed.split(/\s+/);
    if (parts.length < 1) {
      return "Please include at least first and last name.";
    }
    for (const part of parts) {
      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'-]+$/.test(part)) {
        return "Names may only contain letters, apostrophes or hyphens.";
      }
      if (part[0] !== part[0].toUpperCase()) {
        return "Each name part must start with a capital letter.";
      }
    }
    return "";
  },

  email: (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Please enter your email address.";
    }
    // basic RFC-style check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Please enter a valid email address.";
    }
    // enforce common domains (optional)
    const domain = trimmed.split("@")[1].toLowerCase();
    const allowed = ["gmail.com", "yahoo.com", "outlook.com", "example.com"];
    if (!allowed.includes(domain)) {
      return `Email domain must be one of: ${allowed.join(", ")}.`;
    }
    return "";
  },

  street: (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Please enter your street address.";
    }
    if (trimmed.length < 5) {
      return "Street address must be at least 5 characters.";
    }

    if (!/^\d+\s+.+/.test(trimmed)) {
      return "Street should start with a house number, e.g. “123 Main St.”";
    }
    return "";
  },

  postalCode: (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Please enter your postal code.";
    }

    if (/^\d{4}(-\d{4})?$/.test(trimmed)) {
      return "";
    }

    if (/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(trimmed)) {
      return "";
    }
    return "Please enter a valid postal code (e.g. US “12345” or Canadian “A1A 1A1”).";
  },

  city: (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Please enter your city.";
    }
    if (trimmed.length < 2) {
      return "City name must be at least 2 characters.";
    }
    if (!/^[A-Za-z\s'-]+$/.test(trimmed)) {
      return "City may only contain letters, spaces, apostrophes or hyphens.";
    }
    return "";
  },
};

export function validateForm(values) {
  const state = {};
  let isValid = true;

  for (const field in validators) {
    const value = values[field] || "";
    const error = validators[field](value);
    state[field] = { value, error };
    if (error) isValid = false;
  }

  state.isValid = isValid;
  return state;
}
