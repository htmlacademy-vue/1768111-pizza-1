import { shallowMount } from "@vue/test-utils";
import Orders from "../Orders.vue";

describe("Orders", () => {
  // Tests will go here
});

it("renders correctly", () => {
  const wrapper = shallowMount(Orders);
  expect(wrapper.find(".layout").exists()).toBeTruthy();
});

it("deletes order correctly", async () => {
  const deleteOrderMock = jest.fn();

  const wrapper = shallowMount(Orders, {
    methods: {
      deleteOrder: deleteOrderMock,
    },
  });

  await wrapper.find(".order__button button").trigger("click");

  expect(deleteOrderMock).toHaveBeenCalled();
});
