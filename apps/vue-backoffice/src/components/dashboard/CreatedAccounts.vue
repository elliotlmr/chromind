<script setup lang="ts">
import { Bar } from 'vue-chartjs'
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

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [
    {
      label: 'Users',
      data: [10, 22, 18, 30],
      backgroundColor: 'oklch(54.6% 0.245 262.881)',
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<template>
  <div class="bg-stone-800 rounded-xl p-4 flex flex-col w-full">
    <h2 class="text-lg font-semibold mb-2">Created Accounts Per Month</h2>
    <div class="h-full w-full max-w-full relative mx-auto">
      <Bar :data="monthlyData" :options="chartOptions" />
    </div>
  </div>
</template>
