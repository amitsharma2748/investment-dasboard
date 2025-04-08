import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { TABLE_HEADER } from "../IndexUsersTypes";
import { updateFilteredList } from "../../../redux/slice/userListSlice";
import UserTableActionBar from "./UserTableActionBar";
import "@testing-library/jest-dom";
import { act } from "react"; // Import `act` from `react`

// Type for the Redux store state
interface State {
  userList: {
    resData: { id: number; name: string; email: string; company: { name: string } }[];
  };
}

const mockStore = configureStore<State>([]);
const mockDispatch = jest.fn();

// Mock the Redux store and dispatch
jest.mock("../../../redux/store", () => ({
  ...jest.requireActual("../../../redux/store"),
  useAppDispatch: () => mockDispatch,
}));

describe("UserTableActionBar Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeAll(() => {
    // Suppress the specific deprecation warning
    jest.spyOn(console, 'error').mockImplementation((message) => {
      if (message.includes('ReactDOMTestUtils.act is deprecated')) {
        return;
      }
      console.error(message);
    });
  });

  afterAll(() => {
    // Restore the original console.error
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    // Initialize the mock store with test data
    store = mockStore({
      userList: {
        resData: [
          { id: 1, name: "Alice", email: "alice@example.com", company: { name: "TechCorp" } },
          { id: 2, name: "Bob", email: "bob@example.com", company: { name: "DevHouse" } },
        ],
      },
    });
    // Mock the dispatch function
    store.dispatch = mockDispatch;
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  test("renders search input and dropdown correctly", () => {
    render(
      <Provider store={store}>
        <UserTableActionBar />
      </Provider>
    );

    // Check if the dropdown is rendered
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    // Check if the search input is rendered with the correct placeholder
    expect(screen.getByPlaceholderText("Search by Name")).toBeInTheDocument();
  });

  test("updates selected column when dropdown is changed", async () => {
    render(
      <Provider store={store}>
        <UserTableActionBar />
      </Provider>
    );

    const dropdown = screen.getByRole("combobox");

    // Simulate changing the dropdown value to "Email"
    await act(async () => {
      await userEvent.selectOptions(dropdown, TABLE_HEADER.EMAIL);
    });

    // Assert that the dropdown value is updated
    expect(dropdown).toHaveValue(TABLE_HEADER.EMAIL);
  });

  test("dispatches action when user types in search input", async () => {
    render(
      <Provider store={store}>
        <UserTableActionBar />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search by Name");

    // Simulate typing "Alice" in the search input
    await act(async () => {
      await userEvent.type(searchInput, "Alice");
    });

    // Assert that the correct action is dispatched with the filtered list
    expect(mockDispatch).toHaveBeenCalledWith(
      updateFilteredList([
        { id: 1, name: "Alice", email: "alice@example.com", company: { name: "TechCorp" } },
      ])
    );
  });
});