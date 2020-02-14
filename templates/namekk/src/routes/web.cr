# Matches GET "http://host:port/"
require "../../contenthash.cr"

include ContentHash
get "/" do
  item = con
  render "src/views/pages/homepage.ecr", "src/views/layouts/main.ecr"
end
