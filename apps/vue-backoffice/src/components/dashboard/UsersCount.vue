<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
)

const totalUsersData = {
  labels: ['Active', 'Inactive'],
  datasets: [
    {
      data: [180, 45],
      backgroundColor: ['oklch(72.3% 0.219 149.579)', 'oklch(63.7% 0.237 25.331)'],
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<template>
  <div class="bg-stone-800 rounded-xl p-4 h-full w-min flex flex-col">
    <h2 class="text-lg font-semibold mb-2">Total Users</h2>
    <div class="h-full relative">
      <Doughnut :data="totalUsersData" :options="chartOptions" :style="{ maxHeight: '100%' }" />
    </div>
  </div>
</template>
