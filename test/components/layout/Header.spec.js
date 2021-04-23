import Header from "@/components/layout/Header";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";

let wrapper = null;

beforeEach(() => {
  wrapper = shallowMount(Header, {
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Header", () => {
  test("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("should contain brand logotype", () => {
    const brand = wrapper.find("img");
    expect(brand.exists()).toBeTruthy();
  });

/*  test("should contain navigation links", () => {
    const links = wrapper.findAll("a");
    console.log(links);
    expect(links.exists()).toBeTruthy();
    expect(links.length).toBe(2);

    expect(links.at(0).html()).toContain("Main");
    expect(links.at(1).html()).toContain("All rates");
  });*/
});
