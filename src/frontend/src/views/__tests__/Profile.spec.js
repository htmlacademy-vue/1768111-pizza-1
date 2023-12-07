import { shallowMount } from "@vue/test-utils";
import Profile from "../Profile.vue";

const mockStore = {
  state: {
    auth: {
      user: {
        name: "John Doe",
        phone: "1234567890",
        addresses: [{}],
      },
    },
  },
};

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(Profile, {
    mocks: {
      $store: mockStore,
    },
  });
});

it("renders user name and phone", () => {
  expect(wrapper.find(".user__name span").text()).toBe(
    mockStore.state.auth.user.name
  );
  expect(wrapper.find(".user__phone span").text()).toBe(
    mockStore.state.auth.user.phone
  );
});

it("renders user addresses", () => {
  expect(wrapper.findAll(".address-form").length).toBe(
    mockStore.state.auth.user.addresses.length
  );
});

it('enables editing when "Добавить новый адрес" button is clicked', async () => {
  await wrapper.find(".layout__button button").trigger("click");
  expect(wrapper.vm.isEditing).toBe(true);
});

afterEach(() => {
  wrapper.destroy();
});
