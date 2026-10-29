import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LanguagePicker } from './LanguagePicker'

describe('LanguagePicker', () => {
  it('shows flag images instead of text or emoji abbreviations', () => {
    render(<LanguagePicker />)
    fireEvent.click(screen.getByRole('button', { name: 'Language' }))
    const flags = screen.getAllByRole('presentation')
    expect(flags).toHaveLength(6)
    expect(flags.map((flag) => flag.getAttribute('src'))).toEqual([
      'https://flagcdn.com/w40/gb.png',
      'https://flagcdn.com/w40/gb.png',
      'https://flagcdn.com/w40/vn.png',
      'https://flagcdn.com/w40/de.png',
      'https://flagcdn.com/w40/kr.png',
      'https://flagcdn.com/w40/jp.png',
    ])
    expect(screen.queryByText(/^(EN|VI|DE|KO|JA)$/)).not.toBeInTheDocument()
  })
})
