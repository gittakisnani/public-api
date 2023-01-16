import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it } from "vitest";
import Header from "./Header";

afterEach(cleanup)
describe('Header renders correctly', () => {
    it('Should render header without search bar', () => {
        render(<Header />)
        expect(screen.getByRole('contentinfo')).toBeVisible();
        expect(screen.queryByRole('search')).toBe(null)
        
        fireEvent.click(screen.getByRole('button'));
        expect(screen.queryByRole('search')).toBeVisible()
        expect(screen.queryByTestId('searchResult')).toBe(null)
        expect(screen.queryByTestId('clearSearch')).toBeNull()
        expect(screen.getByRole('searchbox')).toHaveValue('')
        fireEvent.change(screen.getByRole('searchbox'), { target: {value: 'test'}} )
        expect(screen.getByRole('searchbox')).toHaveValue('test')
    })
})