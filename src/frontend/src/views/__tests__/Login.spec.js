import { shallowMount } from "@vue/test-utils";
import Login from "../Login.vue";

describe("Login", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.find(".sign-form").exists()).toBeTruthy();
  });
});

it("submits form correctly", async () => {
  const logInMock = jest.fn();
  const $router = { push: jest.fn() };

  const wrapper = shallowMount(Login, {
    methods: {
      logIn: logInMock,
    },
    mocks: {
      $router,
    },
  });

  await wrapper.find("button").trigger("click");

  expect(logInMock).toHaveBeenCalled();
  expect($router.push).toHaveBeenCalledWith("/");
});
