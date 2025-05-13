
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts"

import { cn } from "@/lib/utils"

const chartComponents = {
  line: LineChart,
  bar: BarChart,
}

const chartDataComponents = {
  line: Line,
  bar: Bar,
}

export interface CustomTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: any[];
  label?: string;
  labelFormatter?: (label: string) => string;
  labelClassName?: string;
  formatter?: (value: number, name: string) => [string, string];
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "circle" | "dashed";
  nameKey?: string;
  labelKey?: string;
}

const tooltipVariants = cva(
  "bg-white/95 dark:bg-gray-950/95 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md p-2 text-xs font-medium",
  {
    variants: {
      indicator: {
        line: "pl-6 relative before:absolute before:left-2 before:inset-y-2 before:w-px before:bg-current",
        circle:
          "pl-6 relative before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-current",
        dashed:
          "pl-6 relative before:absolute before:left-2 before:inset-y-2 before:w-px before:bg-current before:content-[''] before:[mask-image:linear-gradient(to_bottom,transparent_33%,white_33%,white_66%,transparent_66%)] before:[mask-size:1px_6px]",
      },
    },
    defaultVariants: {
      indicator: "line",
    },
  }
)

function Chart({
  type = "line",
  data = [],
  x,
  y,
  color,
  colors,
  valueFormatter,
  showAnimation = true,
  showTooltip = true,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  className,
  ...props
}: {
  type?: "line" | "bar"
  data: any[]
  x?: string
  y?: string | string[]
  color?: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  showAnimation?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const xAxisKey = x || "name"
  const yAxisKey = y || "value"
  const yKeys = Array.isArray(yAxisKey) ? yAxisKey : [yAxisKey]
  const ChartComp = chartComponents[type]
  const ChartDataComp = chartDataComponents[type]

  // Provide explicit colors for up to 4 keys or use the color prop
  const dataColors = colors || [
    color || "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ]

  return (
    <div className={cn("w-full h-[300px]", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComp
          data={data}
          margin={{
            top: 16,
            right: 16,
            left: 16,
            bottom: 16,
          }}
        >
          {showGridLines && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              strokeOpacity={0.5}
            />
          )}
          {showXAxis && (
            <XAxis
              dataKey={xAxisKey}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: any) => {
                if (typeof value === "string") {
                  return value.length > 10
                    ? `${value.slice(0, 10)}...`
                    : value
                }
                return String(value)
              }}
            />
          )}
          {showYAxis && (
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: any) =>
                valueFormatter ? valueFormatter(value) : String(value)
              }
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload) return null
                return (
                  <CustomTooltip
                    active={active}
                    payload={payload}
                    label={label}
                    formatter={(value, name) => [
                      valueFormatter ? valueFormatter(value) : String(value),
                      name,
                    ]}
                  />
                )
              }}
            />
          )}
          {showLegend && (
            <Legend
              iconSize={12}
              fontSize={12}
              iconType="circle"
              margin={{ top: 16 }}
            />
          )}
          {yKeys.map((key, index) => {
            const DataComponent = chartDataComponents[type];
            return (
              <DataComponent
                key={key}
                type="monotone"
                dataKey={key}
                stroke={dataColors[index % dataColors.length]}
                fill={dataColors[index % dataColors.length]}
                strokeWidth={2}
                activeDot={{
                  r: 4,
                  stroke: "hsl(var(--background))",
                  strokeWidth: 1,
                }}
                {...(type === "bar" && {
                  isAnimationActive: showAnimation,
                  barSize: 30,
                })}
                {...(type === "line" && {
                  isAnimationActive: showAnimation,
                  dot: false,
                })}
              />
            )
          })}
        </ChartComp>
      </ResponsiveContainer>
    </div>
  )
}

function CustomTooltip({
  active,
  payload,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  hideLabel,
  hideIndicator,
  indicator = "line",
  nameKey = "name",
  labelKey = "value",
  className,
  ...props
}: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const formattedPayload = payload.map((entry) => {
    let [formattedValue, formattedName] = [entry.value, entry[nameKey] || entry.name]

    if (formatter) {
      ;[formattedValue, formattedName] = formatter(entry.value, entry[nameKey] || entry.name)
    }

    return {
      ...entry,
      formatter: formatter,
      value: formattedValue,
      name: formattedName,
      color: entry.color,
    }
  })

  return (
    <div
      className={cn(
        tooltipVariants({ indicator: hideIndicator ? undefined : indicator }),
        className
      )}
      {...props}
    >
      {!hideLabel ? (
        <div className={cn("mb-1 text-muted-foreground", labelClassName)}>
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      ) : null}
      <div className="flex flex-col gap-0.5">
        {formattedPayload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <div
                className="size-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.name}</span>
            </div>
            <span className="font-medium tabular-nums">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Chart, CustomTooltip }
