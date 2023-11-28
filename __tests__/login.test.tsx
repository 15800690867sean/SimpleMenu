// @ts-nocheck
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";

window.alert = (val) => {};

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

// check if all the static parts of homepage are rendered correctly
describe("structure test", () => {
    it("renders login page", () => {
        render(<LoginPage />);
        
        const submit = screen.getByText("submit");
        const cancel = screen.getByText("cancel");
        const usernameInput = screen.getByTitle('username');
        const passwordInput = screen.getByTitle('password');
        
        expect(submit).toBeInTheDocument();
        expect(cancel).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    it("tests login function", async () => {
        render(<LoginPage />);
        
        const submit = screen.getByText("submit");
        const usernameInput = screen.getByTitle('username');
        const passwordInput = screen.getByTitle('password');
        
        expect(submit).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        fireEvent.change(usernameInput, {target: {value: '111'}});
        fireEvent.change(passwordInput, {target: {value: '222'}});
        fireEvent.click(submit);

        await waitFor(() => {
            expect(localStorage.getItem('loginStatus')).toBe(null);
        }, {timeout: 5000});

        fireEvent.change(usernameInput, {target: {value: 'sean'}});
        fireEvent.change(passwordInput, {target: {value: '12345'}});
        fireEvent.click(submit);

        await waitFor(() => {
            expect(localStorage.getItem('loginStatus')).toBe("1");
        }, {timeout: 5000});
    });
});
