/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { resolveHref, slugify, extractRoutes, extractLabels } from "./utilities";

/* resolveHref() tests */

test("resolveHref replaces placeholder with route value", () => {
  const routes = {
    "browser.browser_main": "/browser/",
    "tools.visualization": "/tools/visualization",
  };

  // Test basic substitution
  expect(resolveHref("{browser.browser_main}", routes)).toBe("/browser/");

  // Test substitution with additional URL fragments
  expect(resolveHref("{tools.visualization}#visType=timeline", routes)).toBe(
    "/tools/visualization#visType=timeline"
  );
});

test("resolveHref returns original href if no placeholder", () => {
  const routes = {};

  // Test when href has no placeholders
  expect(resolveHref("/static/path", routes)).toBe("/static/path");
});

test("resolveHref handles missing route key by replacing with empty string", () => {
  const routes = {};

  // Test when the route key is missing in routes
  expect(resolveHref("{nonexistent.route}", routes)).toBe("");
});

test("resolveHref replaces placeholder with empty string if route value is empty", () => {
  const routes = {
    "empty.route": "",
  };
  const href = "{empty.route}";

  expect(resolveHref(href, routes)).toBe("");
});

/* slugify() tests */

describe("slugify function", () => {
  test("converts basic strings to kebab-case", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("This Is A Test")).toBe("this-is-a-test");
  });

  test("handles multiple spaces", () => {
    expect(slugify("Multiple   Spaces")).toBe("multiple-spaces");
  });

  test("trims leading and trailing spaces", () => {
    expect(slugify("  Trim Me  ")).toBe("trim-me");
  });

  test("removes special characters", () => {
    expect(slugify("Special #$% Characters!")).toBe("special-characters");
  });

  test("removes non-ASCII characters", () => {
    expect(slugify("Café con leche")).toBe("caf-con-leche");
  });

  test("preserves underscores", () => {
    expect(slugify("underscore_included")).toBe("underscore_included");
  });

  test("preserves hyphens", () => {
    expect(slugify("already-slugified")).toBe("already-slugified");
  });

  test("collapses multiple hyphens into one", () => {
    expect(slugify("multiple--hyphens")).toBe("multiple-hyphens");
  });

  test("preserves numbers in the string", () => {
    expect(slugify("Version 2.0")).toBe("version-20");
  });

  test("handles empty strings gracefully", () => {
    expect(slugify("")).toBe("");
  });

  test("returns empty string when input is only spaces", () => {
    expect(slugify("     ")).toBe("");
  });

  test("returns empty string when input is only special characters", () => {
    expect(slugify("#$%&*")).toBe("");
  });

  test("handles mixed content", () => {
    expect(slugify("   Mixed Content 123!!")).toBe("mixed-content-123");
  });

  test("leaves valid slugs unchanged", () => {
    expect(slugify("valid-slug-123")).toBe("valid-slug-123");
  });

  test("converts uppercase letters to lowercase", () => {
    expect(slugify("UPPERCASE")).toBe("uppercase");
  });

  test("removes Unicode characters", () => {
    expect(slugify("こんにちは")).toBe("");
  });

  test("removes emojis from the string", () => {
    expect(slugify("Test 😊 Emoji")).toBe("test-emoji");
  });

  test("handles multiple special characters and spaces", () => {
    expect(slugify("   A--Test--String ")).toBe("a-test-string");
  });

  test("preserves underscores and removes special characters", () => {
    expect(slugify("Under_score & Special%Chars")).toBe(
      "under_score-specialchars"
    );
  });

  test("removes periods from the string", () => {
    expect(slugify("Filename.ext")).toBe("filenameext");
  });

  test("removes slashes from the string", () => {
    expect(slugify("path/to/file")).toBe("pathtofile");
  });

  test("removes ampersands from the string", () => {
    expect(slugify("Rock & Roll")).toBe("rock-roll");
  });

  test("removes apostrophes from the string", () => {
    expect(slugify("Don't stop")).toBe("dont-stop");
  });

  test("removes quotation marks from the string", () => {
    expect(slugify('He said "Hello"')).toBe("he-said-hello");
  });
});

/* extractRoutes() tests */

describe('extractRoutes function', () => {
  afterEach(() => {
    // Clean up the DOM after each test
    document.body.innerHTML = '';
  });

  test('extracts routes correctly from the default element', () => {
    // Set up the DOM
    document.body.innerHTML = `
      <div id="metadata-routes" class="d-none">
        <div data-route="static.route1" data-value="/static/route1"></div>
        <div data-route="static.route2" data-value="/static/route2"></div>
      </div>
    `;

    const routes = extractRoutes();

    expect(routes['static.route1']).toBe('/static/route1');
    expect(routes['static.route2']).toBe('/static/route2');
  });

  test('extracts routes correctly from a specified element ID', () => {
    // Set up the DOM with a custom element ID
    document.body.innerHTML = `
      <div id="custom-routes" class="d-none">
        <div data-route="dynamic.route1" data-value="/dynamic/route1"></div>
        <div data-route="dynamic.route2" data-value="/dynamic/route2"></div>
      </div>
    `;

    const routes = extractRoutes('custom-routes');

    expect(routes['dynamic.route1']).toBe('/dynamic/route1');
    expect(routes['dynamic.route2']).toBe('/dynamic/route2');
  });

  test('returns an empty object if the element does not exist', () => {
    const routes = extractRoutes('nonexistent-element');
    expect(Object.keys(routes).length).toBe(0);
  });

  test('handles elements without children gracefully', () => {
    // Set up the DOM with an element that has no children
    document.body.innerHTML = `
      <div id="empty-routes" class="d-none"></div>
    `;

    const routes = extractRoutes('empty-routes');
    expect(Object.keys(routes).length).toBe(0);
  });

  test('accessing a non-existing route throws an error', () => {
    // Set up the DOM
    document.body.innerHTML = `
      <div id="metadata-routes" class="d-none">
        <div data-route="existing.route" data-value="/existing/route"></div>
      </div>
    `;

    const routes = extractRoutes();

    expect(() => {
      routes['nonexistent.route'];
    }).toThrow('Route not found: nonexistent.route');
  });

  test('handles multiple routes with the same data-route attribute', () => {
    // Set up the DOM with duplicate data-route attributes
    document.body.innerHTML = `
      <div id="metadata-routes" class="d-none">
        <div data-route="duplicate.route" data-value="/first/value"></div>
        <div data-route="duplicate.route" data-value="/second/value"></div>
      </div>
    `;

    const routes = extractRoutes();

    // The last one should overwrite the previous
    expect(routes['duplicate.route']).toBe('/second/value');
  });

  test('supports accessing route properties using bracket notation', () => {
    // Set up the DOM
    document.body.innerHTML = `
      <div id="metadata-routes" class="d-none">
        <div data-route="route with spaces" data-value="/route/with/spaces"></div>
      </div>
    `;

    const routes = extractRoutes();

    expect(routes['route with spaces']).toBe('/route/with/spaces');
  });

  test('throws an error when accessing a non-existent route', () => {
    // Set up the DOM
    document.body.innerHTML = `
      <div id="metadata-routes" class="d-none">
        <div data-route="existing.route" data-value="/existing/route"></div>
      </div>
    `;

    const routes = extractRoutes();

    expect(() => {
      routes['nonexistent.route'];
    }).toThrow('Route not found: nonexistent.route');
  });

  test('handles routes with special characters in the route name', () => {
    // Set up the DOM
    document.body.innerHTML = `
      <div id="metadata-routes" class="d-none">
        <div data-route="special!@#$%^&*()" data-value="/special/characters"></div>
      </div>
    `;

    const routes = extractRoutes();

    expect(routes['special!@#$%^&*()']).toBe('/special/characters');
  });

  test('the routes object behaves like a normal object for existing keys', () => {
    // Set up the DOM
    document.body.innerHTML = `
      <div id="metadata-routes" class="d-none">
        <div data-route="route1" data-value="/route1"></div>
      </div>
    `;

    const routes = extractRoutes();

    expect(Object.keys(routes)).toEqual(['route1']);
    expect(Object.values(routes)).toEqual(['/route1']);
    expect('route1' in routes).toBe(true);
    expect(routes.hasOwnProperty('route1')).toBe(true);
  });

  test('the routes object behaves like a normal object for non-existing keys', () => {
    // Set up the DOM
    document.body.innerHTML = `
      <div id="metadata-routes" class="d-none">
        <div data-route="route1" data-value="/route1"></div>
      </div>
    `;

    const routes = extractRoutes();

    expect('nonexistent' in routes).toBe(false);
    expect(routes.hasOwnProperty('nonexistent')).toBe(false);
    expect(() => {
      routes['nonexistent'];
    }).toThrow('Route not found: nonexistent');
  });
});


/* extractLabels() tests */

describe('extractLabels function', () => {
  afterEach(() => {
    // Clean up the DOM after each test
    document.body.innerHTML = '';
  });

  test('extracts labels correctly from the default element', () => {
    // Set up the DOM
    document.body.innerHTML = `
      <div id="metadata-labels" class="d-none">
        <div data-label="Hello" data-value="Bonjour"></div>
        <div data-label="Goodbye" data-value="Au revoir"></div>
      </div>
    `;

    const labels = extractLabels();

    expect(labels['Hello']).toBe('Bonjour');
    expect(labels['Goodbye']).toBe('Au revoir');
  });

  test('extracts labels correctly from a specified element ID', () => {
    // Set up the DOM with a custom element ID
    document.body.innerHTML = `
      <div id="custom-labels" class="d-none">
        <div data-label="Yes" data-value="Oui"></div>
        <div data-label="No" data-value="Non"></div>
      </div>
    `;

    const labels = extractLabels('custom-labels');

    expect(labels['Yes']).toBe('Oui');
    expect(labels['No']).toBe('Non');
  });

  test('returns an empty object if the element does not exist', () => {
    const labels = extractLabels('nonexistent-element');
    expect(Object.keys(labels).length).toBe(0);
  });

  test('handles elements without children gracefully', () => {
    // Set up the DOM with an element that has no children
    document.body.innerHTML = `
      <div id="empty-labels" class="d-none"></div>
    `;

    const labels = extractLabels('empty-labels');
    expect(Object.keys(labels).length).toBe(0);
  });

  test('handles elements with missing data-label or data-value attributes', () => {
    // Set up the DOM with elements missing attributes
    document.body.innerHTML = `
      <div id="incomplete-labels" class="d-none">
        <div data-label="Incomplete" data-value=""></div>
        <div data-label="" data-value="Incomplete"></div>
        <div></div>
      </div>
    `;

    const labels = extractLabels('incomplete-labels');

    expect(labels['Incomplete']).toBe('');
    expect(labels['']).toBe('Incomplete');
  });

  test('Proxy returns the property name if the label does not exist', () => {
    // Set up the DOM with some labels
    document.body.innerHTML = `
      <div id="metadata-labels" class="d-none">
        <div data-label="Existing" data-value="Existent"></div>
      </div>
    `;

    const labels = extractLabels();

    // Accessing an existing label
    expect(labels['Existing']).toBe('Existent');

    // Accessing a non-existing label
    console.log = jest.fn(); // Mock console.log
    expect(labels['NonExisting']).toBe('NonExisting');
    expect(console.log).toHaveBeenCalledWith(
      'Requested label "NonExisting" does not exist in labels dictionary.'
    );
  });

  test('handles multiple labels with the same data-label attribute', () => {
    // Set up the DOM with duplicate data-labels
    document.body.innerHTML = `
      <div id="metadata-labels" class="d-none">
        <div data-label="Duplicate" data-value="First"></div>
        <div data-label="Duplicate" data-value="Second"></div>
      </div>
    `;

    const labels = extractLabels();

    // The last one should overwrite the previous
    expect(labels['Duplicate']).toBe('Second');
  });

  test('does not throw when there are no elements in the DOM', () => {
    // Empty DOM
    document.body.innerHTML = '';

    const labels = extractLabels();

    expect(Object.keys(labels).length).toBe(0);
  });

  test('supports accessing label properties using bracket notation', () => {
    // Set up the DOM
    document.body.innerHTML = `
      <div id="metadata-labels" class="d-none">
        <div data-label="Key With Spaces" data-value="ValueWithSpaces"></div>
      </div>
    `;

    const labels = extractLabels();

    expect(labels['Key With Spaces']).toBe('ValueWithSpaces');
  });
});
