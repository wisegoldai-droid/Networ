import test from 'node:test';
import assert from 'node:assert/strict';
import { translations } from '../src/i18n/translations';

const languages = Object.keys(translations) as Array<keyof typeof translations>;
const base = translations.en;

test('all languages contain the same top-level translation sections', () => {
  const baseKeys = Object.keys(base).sort();
  for (const language of languages) {
    assert.deepEqual(Object.keys(translations[language]).sort(), baseKeys, `Top-level keys differ for ${language}`);
  }
});

test('gallery has same number of items in all languages', () => {
  const expectedLength = base.gallery.items.length;
  for (const language of languages) {
    assert.equal(translations[language].gallery.items.length, expectedLength, `Gallery item count differs for ${language}`);
  }
});

test('service feature cards count is consistent in all languages', () => {
  const expectedLength = base.services.featureCards.length;
  for (const language of languages) {
    assert.equal(
      translations[language].services.featureCards.length,
      expectedLength,
      `Service feature card count differs for ${language}`,
    );
  }
});
