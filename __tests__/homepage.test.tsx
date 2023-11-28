// @ts-nocheck
import { fireEvent, render, screen } from "@testing-library/react";
import Homepage from "@/app/homepage/page";

window.alert = (val) => {};

// check if all the static parts of homepage are rendered correctly
describe("structure test", () => {
    it("renders homepage", () => {
        render(<Homepage />);
        
        const welcome = screen.getByText("Welcome to the homepage");
        const defaultMode = screen.getByText("Default mode");
        const jsonMode = screen.getByText("JSON mode");
        
        expect(welcome).toBeInTheDocument();
        expect(defaultMode).toBeInTheDocument();
        expect(jsonMode).toBeInTheDocument();
    });

    it("logout test", () => {
        localStorage.setItem('loginStatus', "1");

        render(<Homepage />);
        
        const logout = screen.getByText("logout");
        
        expect(logout).toBeInTheDocument();

        fireEvent.click(logout);

        expect(localStorage.getItem('loginStatus')).toBe(null);
    });
});
