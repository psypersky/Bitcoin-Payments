# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
# FROM golang
FROM golang:alpine

# Project Path
# /src/github.com/psypersky/Bitcoin-Payments

# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git
WORKDIR $GOPATH/src/github.com/psypersky/Bitcoin-Payments
COPY . .

# Fetch dependencies.
# Using go get.
RUN go get -d -v

# Build the binary.
RUN go build -o main .

# Expose port 8080 to the outside world
EXPOSE 8080

CMD ["./main"]