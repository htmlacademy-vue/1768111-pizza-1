<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector />
          <BuilderSizeSelector />
          <BuilderIngredientsSelector />

          <div class="content__pizza">
            <AppDrop @drop="transfer($event)">
              <BuilderPizzaView />
            </AppDrop>
            <BuilderPriceCounter />
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import BuilderDoughSelector from "@/common/components/builder/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/common/components/builder/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/common/components/builder/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/common/components/builder/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/common/components/builder/BuilderPriceCounter.vue";
import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    AppDrop,
  },
  methods: {
    ...mapActions("builder", ["transferIngredient"]),
    async transfer(ingredient) {
      await this.transferIngredient(ingredient);
    },
  },
};
</script>
