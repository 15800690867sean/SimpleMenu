// @ts-nocheck
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ButtonItem from "@/app/homepage/components/buttonItem/buttonItem";
import ButtonList from "@/app/homepage/components/buttonList/buttonList";
import { btnArr } from "@/app/homepage/components/mockBtn";
import mock from "@/app/api/menuData/mockData.json";

const Callback = jest.fn();

// provide an empty implementation for window.alert so that this function will not intercept the test
window.alert = (val) => {};

const defaultButtonProps = {
    btnName: 'testBtn',
    callback: Callback,
};

const propsWithoutCallback = {
    btnName: 'testBtnNoCallback',
};

// check if the rendering and onClick function of the buttonItem component work
describe("buttonItem component", () => {
    it("renders a button", () => {
        render(<ButtonItem {...defaultButtonProps} />);

        const button = screen.getByText("testBtn");

        expect(button).toBeInTheDocument();
    });

    it("renders a button", () => {
        render(<ButtonItem {...propsWithoutCallback} />);

        const button = screen.getByText("testBtnNoCallback");

        expect(button).toBeInTheDocument();

        fireEvent.click(button);
      
        expect(Callback).toHaveBeenCalledTimes(0);
    });

    // check if the callback function is called and only called once
    it("calls the onClick function when the button is clicked", () => {
        render(<ButtonItem {...defaultButtonProps} />);
      
        const button = screen.getByText("testBtn");
      
        fireEvent.click(button);
      
        expect(Callback).toHaveBeenCalledTimes(1);
    });
});

// check if the rendering of the buttonList component works correctly
describe("buttonList component", () => {
    it("renders a list in default mode", () => {
        render(<ButtonList/>);

        // check if all the buttons in the mock button array are rendered in the default mode
        btnArr.forEach((btnName) => {
            const button = screen.getByText(btnName);

            fireEvent.click(button);
    
            expect(button).toBeInTheDocument();
        });
    });

    it("renders a list in JSON mode", async () => {
        render(<ButtonList/>);

        const defaultModeBtn = screen.getByText("Default mode");
        const jsonModeBtn = screen.getByText("JSON mode");

        expect(jsonModeBtn).toBeInTheDocument();

        fireEvent.click(jsonModeBtn);

        await waitFor(() => {
            return screen.findByText('button1');
        }, {timeout: 10000});

        // check if all the buttons in the mock button array are rendered in the JSON mode
        // the default json data is fetch from the mockData.json
        Object.keys(mock).forEach((btnName) => {
            const button = screen.getByText(btnName);
            expect(button).toBeInTheDocument();
        });

        fireEvent.click(defaultModeBtn);
        const button = screen.getByText('btn1');
        expect(button).toBeInTheDocument();
    });

    it("renders a list in JSON mode and posts a json to it", async () => {
        render(<ButtonList/>);

        const jsonModeBtn = screen.getByText("JSON mode");

        fireEvent.click(jsonModeBtn);

        await waitFor(() => {
            return screen.findByText('button1');
        }, {timeout: 10000});

        // wait 1s for the page to fetch the data from the api
        const uploader = screen.getByTitle('uploader');

        expect(uploader).toBeInTheDocument();

        // create a fake json file to be uploaded
        const data = {
            "button1": {},
            "button2": {
                "button2-2": {},
            },
            "button3": {}
        };

        const content = JSON.stringify(data);

        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

        const file = new File([blob], "test.json", { lastModified: Date.now() })

        // upload the json file
        fireEvent.change(uploader, { target: { files: { item: () => file, length: 1, 0: file } },})

        // wait until the menu is changed
        await waitFor(() => {
            return screen.findByText('button2');
        }, {timeout: 20000});

        // check if the buttons in the json file are rendered correctly
        ['button1', 'button2', 'button3'].forEach((btnName) => {
            const button = screen.getByText(btnName);
    
            expect(button).toBeInTheDocument();
        });

        // check if click one button can change the menu
        const button2 = screen.getByText('button2');
        expect(button2).toBeInTheDocument();
        fireEvent.click(button2);
        const newBtn = screen.getByText("button2-2");
        expect(newBtn).toBeInTheDocument();

        // check if the reset function works
        const resetBtn = screen.getByText('Reset the menu');
        fireEvent.click(resetBtn);
        expect(newBtn).not.toBeInTheDocument();
        const button3 = screen.getByText('button3');
        expect(button3).toBeInTheDocument();
    });
});