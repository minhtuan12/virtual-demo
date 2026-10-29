import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LanguagePicker } from './LanguagePicker'

describe('LanguagePicker', () => {
  it('shows country flags instead of language abbreviations', () => {
    render(<LanguagePicker />)

    const options = screen.getByRole('combobox', { name: 'Language' }).querySelectorAll('option')
    expect(Array.from(options, (option) => option.textContent)).toEqual(['🇬🇧', '🇻🇳', '🇩🇪', '🇰🇷', '🇯🇵'])
  })
})
