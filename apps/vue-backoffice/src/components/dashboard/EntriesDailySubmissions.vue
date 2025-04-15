<script setup lang="ts">
import { Line } from 'vue-chartjs'
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

// Emotions per day this month - line chart
const emotionData = {
  labels: Array.from({ length: 10 }, (_, i) => `Apr ${i + 1}`),
  datasets: [
    {
      label: 'Entries',
      data: [1, 2, 3, 1, 0, 4, 2, 3, 2, 5],
      fill: false,
      borderColor: 'oklch(79.5% 0.184 86.047)',
      tension: 0.2,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
}
</script>

<template>
  <div class="bg-stone-800 rounded-xl p-4 min-h-80 w-full">
    <h2 class="text-lg font-semibold mb-2">Daily Submissions Of Emotions Entries</h2>
    <Line :data="emotionData" :options="chartOptions" />
  </div>
</template>
