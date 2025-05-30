import { Separator } from "@/components/ui/separator"
import { IconStarFilled } from "@tabler/icons-react"

export function SiteHeader({selectedItem}: { selectedItem: string }) {
  return (
    <header className="flex py-2 h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h6 className="mt-[7px]"><IconStarFilled/></h6>
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h5 className="font-sm mt-[7px]">{selectedItem}</h5>
      </div>
    </header>
  )
}
